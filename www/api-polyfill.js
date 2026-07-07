/* Polyfill window.api for mobile (no Electron) */
(function () {
  if (window.api) return;

  const DB = 'faithwalk';
  const store = {
    get(t) { try { return JSON.parse(localStorage.getItem(DB + ':' + t) || '[]'); } catch { return []; } },
    set(t, d) { localStorage.setItem(DB + ':' + t, JSON.stringify(d)); },
    genId(a) { return a.length ? Math.max(...a.map(r => r.id || 0)) + 1 : 1; },
  };

  let bibleData = null;
  function getBible() {
    if (bibleData) return bibleData;
    try {
      const raw = localStorage.getItem(DB + ':bible');
      if (raw) { bibleData = JSON.parse(raw); return bibleData; }
    } catch {}
    return null;
  }

  function findVerse(book, chapter, verse) {
    const b = getBible();
    if (!b) return null;
    const bk = b.books.find(bk => {
      const n = (bk.englishName||'').toLowerCase();
      const abbr = (bk.book||'').toLowerCase();
      const q = String(book).toLowerCase();
      return n === q || abbr === q || n.startsWith(q) || abbr.startsWith(q);
    });
    if (!bk) return null;
    const ch = bk.chapters.find(c => c.chapter === Number(chapter));
    if (!ch) return null;
    const v = ch.verses.find(v => v.number === Number(verse));
    return v ? { book: bk.englishName, chapter: Number(chapter), verse: Number(verse), text: v.text } : null;
  }

  function findChapter(book, chapter) {
    const b = getBible();
    if (!b) return [];
    const bk = b.books.find(bk => {
      const n = (bk.englishName||'').toLowerCase();
      const abbr = (bk.book||'').toLowerCase();
      const q = String(book).toLowerCase();
      return n === q || abbr === q || n.startsWith(q) || abbr.startsWith(q);
    });
    if (!bk) return [];
    const ch = bk.chapters.find(c => c.chapter === Number(chapter));
    if (!ch) return [];
    return ch.verses.map(v => ({ book: bk.englishName, chapter: Number(chapter), verse: v.number, text: v.text }));
  }

  window.api = {
    /* ---- Profile (key-value) ---- */
    getProfile: async (key) => {
      const rows = store.get('profile');
      const r = rows.find(r => r.key === key);
      return r ? r.value : null;
    },
    setProfile: async (key, value) => {
      const rows = store.get('profile');
      const idx = rows.findIndex(r => r.key === key);
      if (idx >= 0) rows[idx].value = value;
      else rows.push({ id: store.genId(rows), key, value, created_at: new Date().toISOString() });
      store.set('profile', rows);
      return { success: true };
    },

    /* ---- Lessons ---- */
    getLessons: async () => store.get('lessons').sort((a, b) => (b.created_at||'').localeCompare(a.created_at||'')),
    saveLesson: async (title, content, verses, source) => {
      const rows = store.get('lessons');
      const l = { id: store.genId(rows), title, content, verses: JSON.stringify(verses||[]), source: source||'', created_at: new Date().toISOString() };
      rows.push(l);
      store.set('lessons', rows);
      return { success: true, id: l.id };
    },
    deleteLesson: async (id) => {
      store.set('lessons', store.get('lessons').filter(r => r.id !== id));
      return { success: true };
    },
    completeLesson: async (id) => {
      const rows = store.get('lessons');
      const r = rows.find(r => r.id === id);
      if (r) { r.completed = 1; r.completed_at = new Date().toISOString(); }
      store.set('lessons', rows);
      return { success: true };
    },

    /* ---- Prayers ---- */
    getPrayers: async () => store.get('prayers').sort((a, b) => (b.created_at||'').localeCompare(a.created_at||'')),
    savePrayer: async (content, verseRef) => {
      const rows = store.get('prayers');
      const p = { id: store.genId(rows), content, verse_reference: verseRef||null, created_at: new Date().toISOString() };
      rows.push(p);
      store.set('prayers', rows);
      return { success: true, id: p.id };
    },
    deletePrayer: async (id) => {
      store.set('prayers', store.get('prayers').filter(r => r.id !== id));
      return { success: true };
    },

    /* ---- Notes ---- */
    getNotes: async () => store.get('notes').sort((a, b) => ((b.updated_at||b.created_at)||'').localeCompare((a.updated_at||a.created_at)||'')),
    saveNote: async (title, content, book, chapter, verse) => {
      const rows = store.get('notes');
      const n = { id: store.genId(rows), title, content, book: book||null, chapter: chapter||null, verse: verse||null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      rows.push(n);
      store.set('notes', rows);
      return { success: true, id: n.id };
    },
    deleteNote: async (id) => {
      store.set('notes', store.get('notes').filter(r => r.id !== id));
      return { success: true };
    },
    updateNote: async (id, title, content) => {
      const rows = store.get('notes');
      const n = rows.find(r => r.id === id);
      if (n) { n.title = title; n.content = content; n.updated_at = new Date().toISOString(); }
      store.set('notes', rows);
      return { success: true };
    },

    /* ---- Bookmarks ---- */
    getBookmarks: async () => store.get('bookmarks').sort((a, b) => (b.created_at||'').localeCompare(a.created_at||'')),
    saveBookmark: async (book, chapter, verse, text) => {
      const rows = store.get('bookmarks');
      const existing = rows.find(r => r.book === book && r.chapter === chapter && r.verse === verse);
      if (existing) {
        store.set('bookmarks', rows.filter(r => r.id !== existing.id));
        return { success: true, saved: false };
      }
      const b = { id: store.genId(rows), book, chapter, verse, text, created_at: new Date().toISOString() };
      rows.push(b);
      store.set('bookmarks', rows);
      return { success: true, saved: true };
    },
    isBookmarked: async (book, chapter, verse) => {
      const rows = store.get('bookmarks');
      return !!rows.find(r => r.book === book && r.chapter === chapter && r.verse === verse);
    },

    /* ---- Quiz ---- */
    getQuizResults: async () => store.get('quiz_results').sort((a, b) => (b.date||'').localeCompare(a.date||'')).slice(0, 30),
    saveQuizResult: async (date, score, total, spiritualTemp, answers) => {
      const rows = store.get('quiz_results');
      rows.push({ id: store.genId(rows), date, score, total, spiritual_temp: spiritualTemp, answers: JSON.stringify(answers||[]), created_at: new Date().toISOString() });
      store.set('quiz_results', rows);
      return { success: true };
    },
    getTodayQuiz: async (date) => store.get('quiz_results').find(r => r.date === date) || null,

    /* ---- Reading / Seen verses ---- */
    getSeenVerses: async () => store.get('seen_verses'),
    markVerseSeen: async (book, chapter, verse) => {
      const rows = store.get('seen_verses');
      if (!rows.find(r => r.book === book && r.chapter === chapter && r.verse === verse)) {
        rows.push({ id: store.genId(rows), book, chapter, verse, seen_at: new Date().toISOString() });
        store.set('seen_verses', rows);
      }
      return { success: true };
    },
    logReading: async (book, chapter, verse, duration) => {
      const rows = store.get('reading_history');
      rows.push({ id: store.genId(rows), book, chapter, verse, duration: duration||0, read_at: new Date().toISOString() });
      store.set('reading_history', rows);
      return { success: true };
    },
    getReadingHistory: async (limit) => store.get('reading_history').sort((a, b) => ((b.read_at)||'').localeCompare(a.read_at||'')).slice(0, limit||50),
    logDailyVerse: async (date, book, chapter, verse) => {
      const rows = store.get('daily_verse_log');
      rows.push({ id: store.genId(rows), date, book, chapter, verse, created_at: new Date().toISOString() });
      store.set('daily_verse_log', rows);
      return { success: true };
    },
    getRandomUnseenVerse: async (limit) => {
      const seen = store.get('seen_verses');
      const b = getBible();
      if (!b) return null;
      const all = [];
      b.books.forEach(bk => bk.chapters.forEach(ch => ch.verses.forEach(v => {
        if (!seen.find(s => s.book === bk.englishName && s.chapter === ch.chapter && s.verse === v.number))
          all.push({ book: bk.englishName, chapter: ch.chapter, verse: v.number, text: v.text });
      })));
      if (all.length === 0) return null;
      const shuffled = all.sort(() => Math.random() - 0.5);
      return limit ? shuffled.slice(0, limit) : (shuffled[0] || null);
    },

    /* ---- Bible ---- */
    getBookNames: async () => {
      const b = getBible();
      return b ? b.books.map(bk => bk.englishName) : [];
    },
    getChaptersForBook: async (book) => {
      const b = getBible();
      if (!b) return [];
      const bk = b.books.find(bk => {
        const n = (bk.englishName||'').toLowerCase();
        const abbr = (bk.book||'').toLowerCase();
        const q = String(book).toLowerCase();
        return n === q || abbr === q || n.startsWith(q) || abbr.startsWith(q);
      });
      return bk ? bk.chapters.map(c => c.chapter) : [];
    },
    getVerse: async (book, chapter, verse) => findVerse(book, chapter, verse) || null,
    getChapter: async (book, chapter) => findChapter(book, chapter),
    getVerses: async (book, chapter, start, end) => {
      const ch = findChapter(book, chapter);
      return ch.filter(v => v.verse >= start && v.verse <= (end || start));
    },
    searchVerses: async (query, limit) => {
      const b = getBible();
      if (!b) return [];
      const q = query.toLowerCase();
      const results = [];
      for (const bk of b.books) {
        for (const ch of bk.chapters) {
          for (const v of ch.verses) {
            if (v.text.toLowerCase().includes(q)) {
              results.push({ book: bk.englishName, chapter: ch.chapter, verse: v.number, text: v.text });
              if (results.length >= (limit||50)) return results;
            }
          }
        }
      }
      return results;
    },
    getKeyVersesForTopic: async (topic) => [],
    getPersonalizedVerses: async (limit) => {
      const b = getBible();
      if (!b) return [];
      const all = [];
      b.books.forEach(bk => bk.chapters.forEach(ch => ch.verses.forEach(v => {
        all.push({ book: bk.englishName, chapter: ch.chapter, verse: v.number, text: v.text });
      })));
      return all.sort(() => Math.random() - 0.5).slice(0, limit||5);
    },
    getBibleStatus: async () => ({ loaded: !!getBible(), verseCount: 0, versions: { kjv: !!getBible() }, currentVersion: 'kjv' }),
    setBibleVersion: async (v) => ({ success: true, version: 'kjv' }),

    /* ---- Stats ---- */
    getStats: async () => ({
      prayers: store.get('prayers').length,
      versesRead: store.get('reading_history').length,
      uniqueVerses: new Set(store.get('seen_verses').map(s => s.book+':'+s.chapter+':'+s.verse)).size,
      quizzes: store.get('quiz_results').length,
      avgScore: (() => { const q = store.get('quiz_results'); return q.length ? Math.round(q.reduce((a,r) => a + (r.score||0)/(r.total||1), 0)/q.length*100) : 0; })(),
      streak: 0,
    }),
    getReadingCountsByDate: async (days) => ({}),
    getWeeklyPattern: async () => ({}),
    getMonthlyStats: async () => ({}),
    getPrayerCountsByDate: async (days) => ({}),
    getMostReadBooks: async () => [],
    getRecentActivity: async (eventType, limit) => store.get('activity_log').sort((a,b)=>((b.timestamp)||'').localeCompare(a.timestamp||'')).slice(0,limit||20),
    logActivity: async (event, details) => {
      const rows = store.get('activity_log');
      rows.push({ id: store.genId(rows), event, details: details||'', timestamp: new Date().toISOString() });
      store.set('activity_log', rows);
      return { success: true };
    },

    /* ---- Sermon / external ---- */
    fetchTranscript: async (code) => {
      try {
        const r = await fetch('https://raw.githubusercontent.com/faithwalk/sermons/main/'+encodeURIComponent(code)+'.json');
        if (!r.ok) return null;
        return r.json();
      } catch { return null; }
    },
    lookupChurchagesUrl: async (code) => {
      try {
        const r = await fetch('https://churchages.net/api/'+encodeURIComponent(code));
        if (!r.ok) return null;
        return r.json();
      } catch { return null; }
    },
    getCachedSermonTexts: async () => store.get('sermon_texts'),
    openExternal: async (url) => { window.open(url, '_blank'); return { success: true }; },

    /* ---- Window controls (no-op) ---- */
    minimizeWindow: async () => {},
    maximizeWindow: async () => {},
    closeWindow: async () => {},

    /* ---- Listeners (no-op) ---- */
    onBibleLoaded: (cb) => { if (getBible()) setTimeout(cb, 0); },
    onBibleNotLoaded: (cb) => { if (!getBible()) setTimeout(cb, 0); },
    onBibleVersionReady: (cb) => { if (getBible()) setTimeout(() => cb('kjv'), 0); },
  };

  /* Preload Bible data from kjv.json */
  fetch('data/kjv.json').then(r => r.json()).then(d => {
    bibleData = d;
    localStorage.setItem(DB + ':bible', JSON.stringify(d));
  }).catch(() => {});
})();
