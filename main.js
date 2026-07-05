const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const JSONStore = require('./src/json-store');

const userDataPath = app.getPath('userData');
const dataPath = path.join(userDataPath, 'thepreach-data');
let store;
let bibleVerses = [];
let bibleData = {};
let currentVersion = 'kjv';

const BIBLE_BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
  'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah',
  'Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians',
  '2 Corinthians','Galatians','Ephesians','Philippians','Colossians',
  '1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon',
  'Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'
];

const VERSION_MAP = {
  kjv: 'en-kjv',
  asv: 'en-asv',
  web: 'en-web',
  bsb: 'en-bsb',
  dra: 'en-dra',
  rv: 'en-rv',
  t4t: 'en-t4t'
};

const CHAPTER_COUNTS = {
  'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
  'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10,
  'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
  'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5,
  'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3, 'Amos': 9,
  'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3,
  'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4, 'Matthew': 28,
  'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28, 'Romans': 16,
  '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6, 'Philippians': 4,
  'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4,
  'Titus': 3, 'Philemon': 1, 'Hebrews': 13, 'James': 5, '1 Peter': 5,
  '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1, 'Jude': 1,
  'Revelation': 22
};

function getBookId(bookName) {
  return bookName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    const makeRequest = () => {
      const req = https.get(url, { timeout: 10000 }, (res) => {
        if (res.statusCode !== 200) {
          req.destroy();
          if (attempt < retries - 1) {
            attempt++;
            setTimeout(makeRequest, 500 * attempt);
          } else {
            reject(new Error(`Status ${res.statusCode}`));
          }
          return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', (err) => {
        if (attempt < retries - 1) {
          attempt++;
          setTimeout(makeRequest, 500 * attempt);
        } else {
          reject(err);
        }
      });
      req.setTimeout(10000, () => {
        req.destroy();
        if (attempt < retries - 1) {
          attempt++;
          setTimeout(makeRequest, 500 * attempt);
        } else {
          reject(new Error('Timeout'));
        }
      });
    };
    makeRequest();
  });
}

async function downloadBible(version) {
  const bibleId = VERSION_MAP[version] || version;
  const outputDir = path.join(__dirname, 'data');
  const outputFile = path.join(outputDir, `${version}.json`);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  if (fs.existsSync(outputFile)) {
    try {
      const stats = fs.statSync(outputFile);
      if (stats.size > 100000) return true;
    } catch {}
  }

  try {
    console.log(`Starting background compiled download for: ${version} (${bibleId})`);
    const tasks = [];
    for (const book of BIBLE_BOOKS) {
      const bookId = getBookId(book);
      const chapterCount = CHAPTER_COUNTS[book];
      for (let chapter = 1; chapter <= chapterCount; chapter++) {
        tasks.push({ book, bookId, chapter });
      }
    }

    const concurrency = 60;
    const results = {};
    BIBLE_BOOKS.forEach(b => {
      results[b] = Array(CHAPTER_COUNTS[b]).fill(null);
    });

    let activeCount = 0;
    let taskIndex = 0;
    let completedCount = 0;

    await new Promise((resolve) => {
      function startNext() {
        if (taskIndex >= tasks.length) {
          if (activeCount === 0) resolve();
          return;
        }

        const task = tasks[taskIndex++];
        activeCount++;

        const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${bibleId}/books/${task.bookId}/chapters/${task.chapter}.json`;

        fetchWithRetry(url)
          .then(json => {
            if (json && json.data) {
              const verses = json.data.map(v => v.text || '');
              results[task.book][task.chapter - 1] = verses;
            } else {
              results[task.book][task.chapter - 1] = [];
            }
            completedCount++;
            if (completedCount % 200 === 0) {
              console.log(`Download progress for ${version}: ${completedCount}/${tasks.length}...`);
            }
          })
          .catch(() => {
            results[task.book][task.chapter - 1] = [];
          })
          .finally(() => {
            activeCount--;
            startNext();
          });
      }

      for (let i = 0; i < concurrency; i++) {
        startNext();
      }
    });

    const outputList = [];
    BIBLE_BOOKS.forEach(book => {
      outputList.push({
        name: book,
        chapters: results[book]
      });
    });

    fs.writeFileSync(outputFile, JSON.stringify(outputList, null, 2));
    console.log(`Successfully downloaded and compiled ${version} to ${outputFile}`);
    return true;
  } catch (e) {
    console.error(`Failed downloading ${version}:`, e.message);
    return false;
  }
}

function loadBibleVersion(version) {
  const filePath = path.join(__dirname, 'data', `${version}.json`);
  if (!fs.existsSync(filePath)) return false;
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw);
    const verses = [];
    const books = Array.isArray(data) ? data : (data.books || data);
    for (const book of books) {
      const bookName = book.englishName || book.name || book.book || '';
      const chapters = book.chapters || [];
      if (chapters.length === 0) continue;
      if (Array.isArray(chapters[0])) {
        chapters.forEach((chapter, ci) => {
          if (Array.isArray(chapter)) {
            chapter.forEach((text, vi) => {
              verses.push({ book: bookName, chapter: ci + 1, verse: vi + 1, text });
            });
          }
        });
      } else {
        for (const chapter of chapters) {
          const chapNum = chapter.chapter || chapter.number || 0;
          const chapterVerses = chapter.verses || [];
          for (const v of chapterVerses) {
            verses.push({ book: bookName, chapter: chapNum, verse: v.number || 0, text: v.text || '' });
          }
        }
      }
    }
    bibleData[version] = verses;
    return verses.length > 30000;
  } catch (e) { console.error(`Error loading ${version}:`, e.message); return false; }
}

function loadAllDownloadedVersions() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const files = fs.readdirSync(dataDir);
  let loadedAny = false;
  for (const file of files) {
    if (file.endsWith('.json') && file !== 'kjv-sample.json') {
      const version = file.replace('.json', '');
      const success = loadBibleVersion(version);
      if (success) loadedAny = true;
    }
  }
  if (bibleData['kjv'] && bibleData['kjv'].length > 30000) {
    bibleVerses = bibleData['kjv'];
    currentVersion = 'kjv';
  } else {
    const keys = Object.keys(bibleData).filter(k => bibleData[k] && bibleData[k].length > 30000);
    if (keys.length > 0) {
      bibleVerses = bibleData[keys[0]];
      currentVersion = keys[0];
    }
  }
  return loadedAny;
}

function logActivity(event, details = '') {
  try { store.insert('activity_log', { event, details, timestamp: new Date().toISOString() }); } catch {}
}

function getBibleVerse(book, chapter, verse) {
  return bibleVerses.find(v => v.book === book && v.chapter === chapter && v.verse === verse);
}

function getBibleChapter(book, chapter) {
  return bibleVerses.filter(v => v.book === book && v.chapter === chapter).sort((a, b) => a.verse - b.verse);
}

function createWindow() {
  const savedBounds = store ? store.profileGet('windowBounds') : null;
  const bounds = savedBounds ? JSON.parse(savedBounds) : { width: 1280, height: 850 };
  const win = new BrowserWindow({
    width: bounds.width, height: bounds.height, minWidth: 800, minHeight: 600,
    title: 'The Preach', backgroundColor: '#0a0a1a',
    frame: false,
    autoHideMenuBar: true,
    show: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      spellcheck: true
    },
    icon: path.join(__dirname, 'assets', 'icons', 'app-icon.svg'),
  });

  win.loadFile('index.html');

  if (process.argv.includes('--dev') || process.env.DEV) {
    win.loadURL('http://localhost:3199').catch(() => {
      console.log('Dev server not running at :3199, falling back to local file.');
      win.loadFile('index.html');
    });
  } else {
    win.loadFile('index.html');
  }

  win.webContents.setZoomFactor(1.0);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://') && !url.startsWith('http://localhost')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  win.once('ready-to-show', () => {
    win.show();
    if (process.env.DEV) win.webContents.openDevTools();
  });

  const saveBounds = () => {
    if (store) {
      const b = win.getBounds();
      store.profileSet('windowBounds', JSON.stringify({ width: b.width, height: b.height }));
    }
  };
  win.on('resize', saveBounds);
  win.on('move', saveBounds);

  logActivity('app_opened', 'Application launched');
  win.on('close', () => logActivity('app_closed', 'Application closed'));
  return win;
}

app.whenReady().then(async () => {
  store = new JSONStore(dataPath);
  const win = createWindow();
  
  const loadedAny = loadAllDownloadedVersions();
  
  win.webContents.once('did-finish-load', () => {
    if (loadedAny) {
      win.webContents.send('bible:loaded', true);
    }
  });

  if (!bibleData['kjv'] || bibleData['kjv'].length < 30000) {
    downloadBible('kjv').then((dlSuccess) => {
      if (dlSuccess) {
        const ok = loadBibleVersion('kjv');
        if (ok) {
          if (bibleVerses.length < 30000) {
            bibleVerses = bibleData['kjv'];
            currentVersion = 'kjv';
          }
          win.webContents.send('bible:loaded', true);
        } else {
          win.webContents.send('bible:not-loaded', true);
        }
      } else {
        win.webContents.send('bible:not-loaded', true);
      }
    });
  }

  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

ipcMain.handle('db:logActivity', (e, event, details) => { logActivity(event, details); return { success: true }; });

ipcMain.handle('db:savePrayer', (e, content, verseRef) => {
  const r = store.insert('prayers', { content, verse_reference: verseRef || null, created_at: new Date().toISOString() });
  return { success: true, id: r.lastInsertRowid };
});
ipcMain.handle('db:getPrayers', () => store.all('prayers').sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')));
ipcMain.handle('db:deletePrayer', (e, id) => { store.delete('prayers', id); return { success: true }; });

ipcMain.handle('db:saveNote', (e, title, content, book, chapter, verse) => {
  const r = store.insert('notes', { title, content, book: book || null, chapter: chapter || null, verse: verse || null, created_at: new Date().toISOString() });
  return { success: true, id: r.lastInsertRowid };
});
ipcMain.handle('db:getNotes', () => store.all('notes').sort((a, b) => (b.updated_at || b.created_at || '').localeCompare(a.updated_at || a.created_at || '')));
ipcMain.handle('db:deleteNote', (e, id) => { store.delete('notes', id); return { success: true }; });
ipcMain.handle('db:updateNote', (e, id, title, content) => { store.update('notes', id, { title, content }); return { success: true }; });

ipcMain.handle('db:saveBookmark', (e, book, chapter, verse, text) => {
  const existing = store.findOne('bookmarks', r => r.book === book && r.chapter === chapter && r.verse === verse);
  if (existing) {
    store.delete('bookmarks', existing.id);
    return { success: true, saved: false };
  } else {
    store.insert('bookmarks', { book, chapter, verse, text, created_at: new Date().toISOString() });
    return { success: true, saved: true };
  }
});
ipcMain.handle('db:getBookmarks', () => store.all('bookmarks').sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')));
ipcMain.handle('db:isBookmarked', (e, book, chapter, verse) => {
  const b = store.findOne('bookmarks', r => r.book === book && r.chapter === chapter && r.verse === verse);
  return !!b;
});

ipcMain.handle('db:saveQuizResult', (e, date, score, total, spiritualTemp, answers) => {
  store.insert('quiz_results', { date, score, total, spiritual_temp: spiritualTemp, answers: JSON.stringify(answers), created_at: new Date().toISOString() });
  return { success: true };
});
ipcMain.handle('db:getQuizResults', () => store.all('quiz_results').sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 30));
ipcMain.handle('db:getTodayQuiz', (e, date) => store.findOne('quiz_results', r => r.date === date));

ipcMain.handle('db:markVerseSeen', (e, book, chapter, verse) => {
  const existing = store.findOne('seen_verses', r => r.book === book && r.chapter === chapter && r.verse === verse);
  if (!existing) store.insert('seen_verses', { book, chapter, verse, seen_at: new Date().toISOString() });
  return { success: true };
});
ipcMain.handle('db:getSeenVerses', () => store.all('seen_verses'));

ipcMain.handle('db:logReading', (e, book, chapter, verse, duration) => {
  store.insert('reading_history', { book, chapter, verse, duration: duration || 0, read_at: new Date().toISOString() });
  logActivity('verse_read', `${book} ${chapter}:${verse}`);
  return { success: true };
});
ipcMain.handle('db:getReadingHistory', (e, limit = 100) => store.all('reading_history').sort((a, b) => (b.read_at || '').localeCompare(a.read_at || '')).slice(0, limit));

ipcMain.handle('db:getStats', () => {
  const prayers = store.all('prayers').length;
  const versesRead = store.all('reading_history').length;
  const uniqueVerses = store.all('seen_verses').length;
  const quizzes = store.all('quiz_results');
  const avgScore = quizzes.length > 0 ? Math.round(quizzes.reduce((s, q) => s + (q.score * 100 / q.total), 0) / quizzes.length) : 0;
  const streak = new Set(quizzes.map(q => q.date)).size;
  return { prayers, versesRead, uniqueVerses, quizzes: quizzes.length, avgScore, streak };
});

ipcMain.handle('db:getReadingCountsByDate', (e, days = 30) => {
  const counts = {};
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    counts[d.toISOString().split('T')[0]] = 0;
  }
  store.all('reading_history').forEach(r => {
    const day = r.read_at ? r.read_at.split('T')[0] : '';
    if (counts[day] !== undefined) counts[day]++;
  });
  return Object.entries(counts).map(([date, count]) => ({ date, count }));
});

ipcMain.handle('db:getWeeklyPattern', () => {
  const dayCounts = [0,0,0,0,0,0,0];
  store.all('reading_history').forEach(r => {
    if (r.read_at) {
      const d = new Date(r.read_at);
      dayCounts[d.getDay()]++;
    }
  });
  return dayCounts;
});

ipcMain.handle('db:getMonthlyStats', () => {
  const months = {};
  store.all('reading_history').forEach(r => {
    if (r.read_at) {
      const key = r.read_at.substring(0, 7);
      if (!months[key]) months[key] = { verses: 0, prayers: 0, quizzes: 0 };
      months[key].verses++;
    }
  });
  store.all('prayers').forEach(p => {
    if (p.created_at) {
      const key = p.created_at.substring(0, 7);
      if (!months[key]) months[key] = { verses: 0, prayers: 0, quizzes: 0 };
      months[key].prayers++;
    }
  });
  store.all('quiz_results').forEach(q => {
    if (q.date) {
      const key = q.date.substring(0, 7);
      if (!months[key]) months[key] = { verses: 0, prayers: 0, quizzes: 0 };
      months[key].quizzes++;
    }
  });
  return Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([month, data]) => ({ month, ...data }));
});

ipcMain.handle('db:getPrayerCountsByDate', (e, days = 30) => {
  const counts = {};
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    counts[d.toISOString().split('T')[0]] = 0;
  }
  store.all('prayers').forEach(p => {
    const day = p.created_at ? p.created_at.split('T')[0] : '';
    if (counts[day] !== undefined) counts[day]++;
  });
  return Object.entries(counts).map(([date, count]) => ({ date, count }));
});

ipcMain.handle('db:getMostReadBooks', () => {
  const counts = {};
  store.all('reading_history').forEach(r => { counts[r.book] = (counts[r.book] || 0) + 1; });
  return Object.entries(counts).map(([book, count]) => ({ book, count })).sort((a, b) => b.count - a.count).slice(0, 5);
});

ipcMain.handle('db:getUnseenVersesByBook', (e, book, limit = 50) => {
  const seen = new Set(store.all('seen_verses').filter(s => s.book === book).map(s => `${s.chapter}:${s.verse}`));
  return bibleVerses.filter(v => v.book === book && !seen.has(`${v.chapter}:${v.verse}`)).slice(0, limit).map(v => ({ chapter: v.chapter, verse: v.verse }));
});

ipcMain.handle('db:getProfile', (e, key) => store.profileGet(key));
ipcMain.handle('db:setProfile', (e, key, value) => { store.profileSet(key, value); return { success: true }; });

ipcMain.handle('db:logDailyVerse', (e, date, book, chapter, verse) => {
  const existing = store.find('daily_verse_log', r => r.date === date);
  existing.forEach(r => store.delete('daily_verse_log', r.id));
  store.insert('daily_verse_log', { date, book, chapter, verse, created_at: new Date().toISOString() });
  return { success: true };
});

ipcMain.handle('db:getLessons', () => store.all('lessons').sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')));
ipcMain.handle('db:saveLesson', (e, title, content, verses, source) => {
  const r = store.insert('lessons', { title, content, verses: JSON.stringify(verses), source: source || '', created_at: new Date().toISOString() });
  return { success: true, id: r.lastInsertRowid };
});
ipcMain.handle('db:completeLesson', (e, id) => { store.update('lessons', id, { completed: 1, completed_at: new Date().toISOString() }); return { success: true }; });
ipcMain.handle('db:deleteLesson', (e, id) => { store.delete('lessons', id); return { success: true }; });

ipcMain.handle('bible:getVerse', (e, book, chapter, verse) => getBibleVerse(book, chapter, verse));
ipcMain.handle('bible:getChapter', (e, book, chapter) => getBibleChapter(book, chapter));
ipcMain.handle('bible:getVerses', (e, book, chapter, startVerse, endVerse) => bibleVerses.filter(v => v.book === book && v.chapter === chapter && v.verse >= startVerse && v.verse <= endVerse).sort((a, b) => a.verse - b.verse));
ipcMain.handle('bible:getBookNames', () => BIBLE_BOOKS);
ipcMain.handle('bible:getChaptersForBook', (e, book) => [...new Set(bibleVerses.filter(v => v.book === book).map(v => v.chapter))].sort((a, b) => a - b));
ipcMain.handle('bible:getVersesForChapter', (e, book, chapter) => bibleVerses.filter(v => v.book === book && v.chapter === chapter).map(v => v.verse).sort((a, b) => a - b));

ipcMain.handle('bible:getRandomUnseenVerse', (e, limit = 50) => {
  const seen = new Set(store.all('seen_verses').map(s => `${s.book}|${s.chapter}|${s.verse}`));
  const books = ['Psalms','Proverbs','Matthew','John','Romans','Revelation','Isaiah','Ephesians','Hebrews','James','1 Peter','1 John','Genesis','Exodus','Daniel','Acts','Mark','Luke'];
  const candidates = [];
  for (const book of books) {
    const verses = bibleVerses.filter(v => v.book === book && !seen.has(`${v.book}|${v.chapter}|${v.verse}`));
    for (let i = 0; i < Math.ceil(limit / books.length) && verses.length > 0; i++) {
      const idx = Math.floor(Math.random() * verses.length);
      candidates.push(verses.splice(idx, 1)[0]);
    }
  }
  if (candidates.length === 0) { const ps = bibleVerses.filter(v => v.book === 'Psalms'); return ps[Math.floor(Math.random() * ps.length)]; }
  return candidates[Math.floor(Math.random() * candidates.length)];
});

ipcMain.handle('bible:getPersonalizedVerses', (e, limit = 10) => {
  const counts = {};
  store.all('reading_history').forEach(r => { counts[r.book] = (counts[r.book] || 0) + 1; });
  const readBooks = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);
  const relatedBooks = {
    'Genesis': ['Exodus','Psalms','Hebrews'], 'Psalms': ['Proverbs','Isaiah','Matthew'],
    'Proverbs': ['James','Ecclesiastes','Psalms'], 'Matthew': ['Mark','Luke','John','Romans'],
    'John': ['1 John','Romans','Revelation'], 'Romans': ['Galatians','Ephesians','Hebrews'],
    'Revelation': ['Daniel','Ezekiel','Matthew','1 Thessalonians'], 'Isaiah': ['Jeremiah','Matthew','Romans'],
    'Ephesians': ['Colossians','Romans','Philippians'], 'Hebrews': ['Romans','Galatians','1 Peter'],
  };
  let targetBooks = [];
  for (const book of readBooks) { if (relatedBooks[book]) targetBooks.push(...relatedBooks[book]); }
  if (targetBooks.length === 0) targetBooks = ['Psalms','Proverbs','Matthew','John'];
  const verses = [];
  for (const book of [...new Set(targetBooks)].slice(0, 5)) {
    const bv = bibleVerses.filter(v => v.book === book);
    for (let i = 0; i < 3 && bv.length > 0; i++) {
      const idx = Math.floor(Math.random() * bv.length);
      verses.push(bv.splice(idx, 1)[0]);
    }
  }
  return verses.slice(0, limit);
});

ipcMain.handle('bible:getKeyVersesForTopic', (e, topic) => {
  const topics = {
    'faith': [{book:'Hebrews',chapter:11,verse:1},{book:'Romans',chapter:10,verse:17},{book:'James',chapter:2,verse:17},{book:'2 Corinthians',chapter:5,verse:7},{book:'Mark',chapter:11,verse:24},{book:'Hebrews',chapter:11,verse:6}],
    'prayer': [{book:'Matthew',chapter:6,verse:6},{book:'Philippians',chapter:4,verse:6},{book:'1 Thessalonians',chapter:5,verse:17},{book:'James',chapter:5,verse:16},{book:'Jeremiah',chapter:33,verse:3},{book:'Luke',chapter:18,verse:1}],
    'love': [{book:'1 Corinthians',chapter:13,verse:4},{book:'John',chapter:3,verse:16},{book:'Romans',chapter:8,verse:38},{book:'1 John',chapter:4,verse:19},{book:'John',chapter:15,verse:13},{book:'Romans',chapter:5,verse:8}],
    'strength': [{book:'Isaiah',chapter:40,verse:31},{book:'Philippians',chapter:4,verse:13},{book:'Ephesians',chapter:6,verse:10},{book:'Psalms',chapter:46,verse:1},{book:'2 Timothy',chapter:1,verse:7},{book:'Nehemiah',chapter:8,verse:10}],
    'end times': [{book:'Revelation',chapter:3,verse:20},{book:'Matthew',chapter:24,verse:44},{book:'1 Thessalonians',chapter:4,verse:16},{book:'Revelation',chapter:22,verse:7},{book:'2 Timothy',chapter:3,verse:1},{book:'Daniel',chapter:12,verse:1}],
    'salvation': [{book:'Romans',chapter:10,verse:9},{book:'Ephesians',chapter:2,verse:8},{book:'John',chapter:14,verse:6},{book:'Acts',chapter:4,verse:12},{book:'Romans',chapter:6,verse:23},{book:'Titus',chapter:3,verse:5}],
    'holy spirit': [{book:'Acts',chapter:2,verse:4},{book:'John',chapter:14,verse:26},{book:'Ephesians',chapter:5,verse:18},{book:'Romans',chapter:8,verse:14},{book:'Galatians',chapter:5,verse:22},{book:'Acts',chapter:1,verse:8}],
    'watchfulness': [{book:'Matthew',chapter:24,verse:42},{book:'1 Peter',chapter:5,verse:8},{book:'Mark',chapter:13,verse:33},{book:'Revelation',chapter:16,verse:15},{book:'Luke',chapter:21,verse:36},{book:'1 Thessalonians',chapter:5,verse:6}],
  };
  const verses = topics[topic.toLowerCase()] || topics['faith'];
  return verses.map(v => getBibleVerse(v.book, v.chapter, v.verse)).filter(Boolean);
});

ipcMain.handle('bible:searchVerses', (e, query, limit = 20) => bibleVerses.filter(v => v.text.toLowerCase().includes(query.toLowerCase())).slice(0, limit));
ipcMain.handle('bible:getBibleStatus', () => {
  const versionsStatus = {};
  for (const v of Object.keys(VERSION_MAP)) {
    versionsStatus[v] = !!(bibleData[v] && bibleData[v].length > 30000);
  }
  return {
    loaded: bibleVerses.length > 30000,
    verseCount: bibleVerses.length,
    versions: versionsStatus,
    currentVersion
  };
});
ipcMain.handle('bible:setVersion', async (e, version) => {
  if (bibleData[version] && bibleData[version].length > 30000) {
    bibleVerses = bibleData[version];
    currentVersion = version;
    return { success: true, version };
  }
  if (!bibleData[version] || bibleData[version].length < 30000) {
    const ok = await downloadBible(version);
    if (ok) {
      loadBibleVersion(version);
      if (bibleData[version] && bibleData[version].length > 30000) {
        bibleVerses = bibleData[version];
        currentVersion = version;
        return { success: true, version };
      }
    }
  }
  return { success: false };
});

ipcMain.handle('app:openExternal', (e, url) => {
  shell.openExternal(url);
});

function fetchFromUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        req.destroy();
        return fetchFromUrl(loc).then(resolve);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', () => resolve(''));
    req.setTimeout(10000, () => { req.destroy(); resolve(''); });
  });
}

function extractSermonText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function cleanTranscriptLines(text) {
  const lines = text.split(/\n/).filter(l => l.trim().length > 10
    && !l.includes('Living Word Broadcast')
    && !l.includes('All Rights Reserved')
    && !l.includes('Listeners Now')
    && !l.includes('Sermon Downloads')
    && !l.includes('Home')
    && !l.includes('Broadcast Schedule')
    && !l.includes('Privacy Policy')
    && !l.includes('Disclaimers')
    && !l.includes('WBTextIndex')
    && !l.includes('Last Updated')
    && !l.includes('Click here'));
  return lines.join('\n\n');
}

function extractChurchagesUrl(html, code) {
  const lowerCode = code.toLowerCase();
  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href="(https:\/\/churchages\.net\/en\/sermon\/branham\/([^"]+))"/gi;
  let match;
  const candidates = [];
  while ((match = hrefRegex.exec(html)) !== null) {
    const url = match[1];
    const slug = match[2];
    if (slug.toLowerCase().startsWith(lowerCode)) candidates.push(url);
  }
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1) return candidates[0];
  const mdRegex = /\[([^\]]+)\]\((https:\/\/churchages\.net\/en\/sermon\/branham\/([^)]+))\)/gi;
  while ((match = mdRegex.exec(html)) !== null) {
    const url = match[2];
    const slug = match[3];
    if (slug.toLowerCase().startsWith(lowerCode)) candidates.push(url);
  }
  return candidates.length > 0 ? candidates[0] : null;
}

async function lookupChurchagesUrl(code) {
  const cached = store.findOne('churchages_urls', r => r.code === code);
  if (cached) return cached.url;
  const year = parseInt(code.slice(0, 2));
  const fullYear = year < 50 ? 2000 + year : 1900 + year;
  const url = `https://churchages.net/en/sermons/branham/${fullYear}/`;
  const html = await fetchFromUrl(url);
  if (!html) return null;
  const foundUrl = extractChurchagesUrl(html, code);
  if (foundUrl) {
    store.insert('churchages_urls', { code, url: foundUrl, fetched_at: new Date().toISOString() });
    return foundUrl;
  }
  return null;
}

ipcMain.handle('app:lookupChurchagesUrl', async (e, code) => lookupChurchagesUrl(code));

ipcMain.handle('app:getCachedSermonTexts', () => store.all('sermon_texts'));

ipcMain.handle('app:getRecentActivity', (e, eventType, limit = 10) => {
  const all = store.all('activity_log');
  const filtered = eventType ? all.filter(l => l.event === eventType) : all;
  return filtered.slice(-limit);
});



ipcMain.handle('app:fetchTranscript', async (e, code) => {
  const cached = store.findOne('sermon_texts', r => r.code === code);
  if (cached) return { text: cached.text, cached: true };

  // Try churchages.net first
  const churchagesUrl = await lookupChurchagesUrl(code);
  if (churchagesUrl) {
    const html = await fetchFromUrl(churchagesUrl);
    if (html && html.length > 200) {
      const text = extractSermonText(html);
      if (text.length > 200) {
        const sermonText = cleanTranscriptLines(text);
        if (sermonText.length > 100) {
          store.insert('sermon_texts', { code, text: sermonText, fetched_at: new Date().toISOString() });
        }
        return { text: sermonText, cached: false };
      }
    }
  }

  const sources = [
    `https://livingwordbroadcast.org/LWBWBTextfiles/gettf.php?textfile=${encodeURIComponent(code)}.htm`,
    `https://branham.org/en/messages/${code}`,
  ];

  for (const url of sources) {
    const html = await fetchFromUrl(url);
    if (!html || html.length < 200) continue;
    const text = extractSermonText(html);
    if (text.length > 200) {
      const sermonText = cleanTranscriptLines(text);
      if (sermonText.length > 100) {
        store.insert('sermon_texts', { code, text: sermonText, fetched_at: new Date().toISOString() });
      }
      return { text: sermonText, cached: false };
    }
  }
  return { text: '', error: 'No transcript source available' };
});

ipcMain.on('window:minimize', (e) => BrowserWindow.fromWebContents(e.sender)?.minimize());
ipcMain.on('window:maximize', (e) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  if (w?.isMaximized()) w.unmaximize(); else w?.maximize();
});
ipcMain.on('window:close', (e) => BrowserWindow.fromWebContents(e.sender)?.close());
