const QUIZ_QUESTIONS = [
  { question: "Have you spent time in prayer today?", answers: [{ text: "Yes, deeply and sincerely", points: 10 }, { text: "Yes, but briefly", points: 7 }, { text: "I tried but got distracted", points: 5 }, { text: "No, I've been too busy", points: 2 }] },
  { question: "How much time have you spent reading the Bible today?", answers: [{ text: "Over an hour, studying deeply", points: 10 }, { text: "30 minutes to an hour", points: 8 }, { text: "15-30 minutes", points: 6 }, { text: "Less than 15 minutes", points: 4 }, { text: "I haven't read at all", points: 1 }] },
  { question: "Are you watching for the signs of the times and Christ's return?", answers: [{ text: "Yes, I study prophecy daily", points: 10 }, { text: "I think about it often", points: 8 }, { text: "Sometimes, when I'm reminded", points: 5 }, { text: "Rarely, it's not on my mind", points: 2 }] },
  { question: "Have you shared the gospel or witnessed to someone recently?", answers: [{ text: "Yes, I actively share my faith", points: 10 }, { text: "I've tried to this week", points: 7 }, { text: "I've been meaning to", points: 4 }, { text: "No, I've been ashamed or silent", points: 1 }] },
  { question: "How is your relationship with the Holy Spirit?", answers: [{ text: "I feel filled and led by Him daily", points: 10 }, { text: "I sense His presence often", points: 8 }, { text: "Sometimes I feel close, sometimes distant", points: 5 }, { text: "I've been walking in my own strength", points: 2 }] },
  { question: "Are you harboring any unconfessed sin?", answers: [{ text: "No, I keep short accounts with God", points: 10 }, { text: "I confessed and repented today", points: 8 }, { text: "I'm struggling but seeking help", points: 5 }, { text: "Yes, and I'm not ready to let go", points: 1 }] },
  { question: "Do you feel the fire of God burning in your heart?", answers: [{ text: "Yes, I'm on fire for Christ!", points: 10 }, { text: "Mostly, with occasional coldness", points: 7 }, { text: "It flickers - sometimes hot, sometimes cold", points: 5 }, { text: "I feel lukewarm right now", points: 3 }, { text: "I feel cold and distant from God", points: 1 }] },
  { question: "Have you been listening to sermons or spiritual teaching?", answers: [{ text: "Yes, daily - the Prophet's messages and Scripture", points: 10 }, { text: "A few times this week", points: 7 }, { text: "Once or twice this week", points: 5 }, { text: "Not recently", points: 2 }] },
  { question: "Are you living separated from the world's influences?", answers: [{ text: "Yes, I guard what I watch and listen to", points: 10 }, { text: "Mostly, with some compromises", points: 7 }, { text: "I struggle with worldly influences", points: 4 }, { text: "No, I'm deeply entangled", points: 1 }] },
  { question: "Do you have a burning desire for Christ's return?", answers: [{ text: "Yes, I long for it every day!", points: 10 }, { text: "I think about it and hope for it", points: 8 }, { text: "It's a nice thought but not urgent to me", points: 5 }, { text: "I haven't thought about it much", points: 2 }] },
];

const ENCOURAGEMENTS = {
  'On Fire': ["Hallelujah! Your fire is burning bright! Keep feeding it with the Word and prayer!", "Brother/Sister, you are ablaze for God! The Spirit is flowing through you!", "Your spiritual temperature shows you're burning hot for Jesus! Stay in the flame!"],
  'Hot': ["You're burning hot for Christ! Keep stirring the flame with prayer and the Word!", "Good! The fire is strong. Feed it daily and it will grow even brighter!", "You're in a good place spiritually. Keep pressing forward!"],
  'Warm': ["You're warm, but don't let the fire die! Add more time in prayer and Scripture!", "Warm is good but God wants you HOT! Seek Him with all your heart today!", "The embers are glowing - fan them into flame! Read Revelation and the Prophets!"],
  'Cooling': ["Warning! Your fire is cooling down. Repent and return to your first love!", "Don't let the enemy steal your fire! Get back into prayer NOW!", "The world is creeping in. Separate yourself and seek God's face!"],
  'Cold': ["URGENT: You're in danger! Cry out to God and repent! He will restore you!", "The fire has nearly gone out! But God's mercy is new this morning! Return to Him!", "Brother/Sister, wake up! Christ is coming soon! Fall on your face before Him!"],
};

// Lesson generation uses scripture-based Smart Lessons

const SERMONS_DATA = [
  { title: "The Seven Seals", date: "1963", category: "seven-seals", desc: "The opening of the Seven Seals revealed", scripture: "Revelation 6", code: "63-0317M", more: "https://churchages.net/en/sermon/branham/63-0317M-seals-1-god-hiding-revealing-himself-in-simplicity/" },
  { title: "An Identification of the Seven Seals", date: "1963", category: "seven-seals", desc: "The breach between church ages and the seals", scripture: "Revelation 5-8", code: "63-0317E", more: "https://churchages.net/en/sermon/branham/63-0317E-seals-2-breach-between-church-ages-and-the-seals/" },
  { title: "The First Seal", date: "1963", category: "seven-seals", desc: "The white horse and its rider", scripture: "Revelation 6:1-2", code: "63-0318", more: "https://churchages.net/en/sermon/branham/63-0318-seals-3-first-seal/" },
  { title: "The Second Seal", date: "1963", category: "seven-seals", desc: "The red horse of war", scripture: "Revelation 6:3-4", code: "63-0319", more: "https://churchages.net/en/sermon/branham/63-0319-seals-4-second-seal/" },
  { title: "The Third Seal", date: "1963", category: "seven-seals", desc: "The black horse of famine", scripture: "Revelation 6:5-6", code: "63-0320", more: "https://churchages.net/en/sermon/branham/63-0320-seals-5-third-seal/" },
  { title: "The Fourth Seal", date: "1963", category: "seven-seals", desc: "The pale horse of death", scripture: "Revelation 6:7-8", code: "63-0321", more: "https://churchages.net/en/sermon/branham/63-0321-seals-6-fourth-seal/" },
  { title: "The Fifth Seal", date: "1963", category: "seven-seals", desc: "The souls under the altar", scripture: "Revelation 6:9-11", code: "63-0322", more: "https://churchages.net/en/sermon/branham/63-0322-seals-7-fifth-seal/" },
  { title: "The Sixth Seal", date: "1963", category: "seven-seals", desc: "Cosmic disturbances before the end", scripture: "Revelation 6:12-17", code: "63-0323", more: "https://churchages.net/en/sermon/branham/63-0323-seals-8-sixth-seal/" },
  { title: "The Seventh Seal", date: "1963", category: "seven-seals", desc: "The silence in heaven for half an hour", scripture: "Revelation 8:1", code: "63-0324E", more: "https://churchages.net/en/sermon/branham/63-0324E-seals-10-seventh-seal/" },
  { title: "Questions and Answers on the Seals", date: "1963", category: "seven-seals", desc: "Key questions answered about the Seven Seals", scripture: "Revelation", code: "63-0324M", more: "https://churchages.net/en/sermon/branham/63-0324M-seals-9-questions-and-answers-on-the-seals/" },
  { title: "Feast of the Trumpets", date: "1964", category: "revelation", desc: "The meaning of the Feast of Trumpets in type", scripture: "Leviticus 23:23-25", code: "64-0719M", more: "https://churchages.net/en/sermon/branham/64-0719M-feast-of-the-trumpets/" },
  { title: "Ashamed", date: "1965", category: "revelation", desc: "Being ashamed of the Gospel in the last days", scripture: "Romans 1:16", code: "65-0711", more: "https://churchages.net/en/sermon/branham/65-0711-ashamed/" },
  { title: "Indictment", date: "1963", category: "signs", desc: "The indictment against this generation", scripture: "Matthew 24", code: "63-0707M", more: "https://churchages.net/en/sermon/branham/63-0707M-indictment/" },
  { title: "Trial", date: "1964", category: "signs", desc: "The trial of this generation before God", scripture: "Revelation 6:12", code: "64-0427", more: "https://churchages.net/en/sermon/branham/64-0427-trial/" },
  { title: "Absolute", date: "1962", category: "spiritual", desc: "The absoluteness of God's Word", scripture: "Hebrews 13:8", code: "62-1230M", more: "https://churchages.net/en/sermon/branham/62-1230M-absolute/" },
  { title: "Recognizing Your Day and Its Message", date: "1964", category: "spiritual", desc: "Knowing the message for your generation", scripture: "Luke 19:42", code: "64-0726M", more: "https://churchages.net/en/sermon/branham/64-0726M-recognizing-your-day-and-its-message/" },
  { title: "Is This the Sign of the End, Sir?", date: "1962", category: "spiritual", desc: "The signs that mark the end of the age", scripture: "Matthew 24:3", code: "62-1230E", more: "https://churchages.net/en/sermon/branham/62-1230E-is-this-the-sign-of-the-end-sir/" },
  { title: "Communion", date: "1965", category: "end-times", desc: "The significance of the Lord's Supper", scripture: "1 Corinthians 11:23-26", code: "65-1212", more: "https://churchages.net/en/sermon/branham/65-1212-communion/" },
  { title: "Future Home of the Heavenly Bridegroom and Earthly Bride", date: "1964", category: "end-times", desc: "The eternal home prepared for the Bride — includes 'The Spoken Word is the Original Seed'", scripture: "John 14:1-3", code: "64-0802", more: "https://churchages.net/en/sermon/branham/64-0802-future-home-of-heavenly-bridegroom-earthly-bride/" },
  { title: "Christ Is Revealed in His Own Word", date: "1965", category: "revelation", desc: "How Christ is revealed through the written Word", scripture: "John 5:39", code: "65-0822M", more: "https://churchages.net/en/sermon/branham/65-0822M-christ-is-revealed-in-his-own-word/" },
  { title: "The God of This Evil Age", date: "1965", category: "end-times", desc: "Who is the god of this age?", scripture: "2 Corinthians 4:4", code: "65-0801M", more: "https://churchages.net/en/sermon/branham/65-0801M-god-of-this-evil-age/" },
  { title: "Christ Is the Mystery of God Revealed", date: "1963", category: "revelation", desc: "Christ revealed as the mystery of God", scripture: "Colossians 2:2", code: "63-0728", more: "https://churchages.net/en/sermon/branham/63-0728-christ-is-the-mystery-of-god-revealed/" },
  { title: "The Seed of Discrepancy", date: "1965", category: "end-times", desc: "The difference between the true and false seed", scripture: "Genesis 3:15", code: "65-0118", more: "https://churchages.net/en/sermon/branham/65-0118-seed-of-discrepancy/" },
  { title: "The Anointed Ones at the End Time", date: "1965", category: "signs", desc: "Who are the anointed ones in the last days?", scripture: "Matthew 24:24", code: "65-0725M", more: "https://churchages.net/en/sermon/branham/65-0725M-anointed-ones-at-the-end-time/" },
  { title: "Questions and Answers", date: "1954", category: "revelation", desc: "Law and grace in the Old and New Testaments", scripture: "Hebrews 10:1", code: "54-0516", more: "https://churchages.net/en/sermon/branham/54-0516-questions-and-answers-law-having-a-shadow/" },
];

const GREETINGS = [
  { hour: [0, 6], text: "Good night, beloved. God watches over you even while you sleep. The Lord is your keeper." },
  { hour: [6, 9], text: "Good morning! A new day to seek the Lord. His mercies are new every morning." },
  { hour: [9, 12], text: "Good morning! May the Word of God guide your steps today." },
  { hour: [12, 17], text: "Good afternoon! Take time to pause and reflect on God's goodness." },
  { hour: [17, 21], text: "Good evening! The day is fading, but God's love never does." },
  { hour: [21, 24], text: "Good night. Rest in the arms of Jesus. He never sleeps nor slumbers." },
];

let currentPage = 'dashboard';
let quizState = { current: 0, score: 0, answers: [] };
let currentSermonFilter = 'all';
let dailyVerseIndex = 0;
let dailyVerseHistory = [];
let deferredPrompt = null;
let currentSermon = null;
let notesCache = [];
let editingNoteId = null;
let currentNotesView = 'solar';
let selectedNote = null;
let currentNoteFilterBook = 'all';
function debounce(fn, ms) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; }

function toast(msg, type = 'info') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:500;color:white;z-index:9999;opacity:0;transition:opacity 0.3s,transform 0.3s;transform:translateY(20px);pointer-events:none;max-width:320px;';
    document.body.appendChild(t);
  }
  const colors = { info: 'linear-gradient(135deg,#818cf8,#a78bfa)', success: 'linear-gradient(135deg,#34d399,#059669)', warning: 'linear-gradient(135deg,#fbbf24,#f97316)', error: 'linear-gradient(135deg,#f87171,#ef4444)' };
  t.style.background = colors[type] || colors.info;
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; }, 2500);
}

function showConfirm(msg) {
  return new Promise((resolve) => {
    let overlay = document.getElementById('confirmOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'confirmOverlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9998;';
      overlay.innerHTML = '<div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center;"><p id="confirmMsg" style="font-size:16px;margin-bottom:24px;color:var(--text-primary);"></p><div style="display:flex;gap:12px;justify-content:center;"><button id="confirmNo" class="btn-secondary" style="padding:10px 24px;">Cancel</button><button id="confirmYes" class="btn-primary" style="padding:10px 24px;">Delete</button></div></div>';
      document.body.appendChild(overlay);
    }
    document.getElementById('confirmMsg').textContent = msg;
    overlay.style.display = 'flex';
    const cleanup = () => { overlay.style.display = 'none'; };
    document.getElementById('confirmYes').onclick = () => { cleanup(); resolve(true); };
    document.getElementById('confirmNo').onclick = () => { cleanup(); resolve(false); };
  });
}

async function navigateToReading(book, chapter) {
  document.getElementById('searchOverlay').classList.remove('active');
  await navigateTo('bible-reader');
  const bookSelect = document.getElementById('bookSelect');
  const chapterSelect = document.getElementById('chapterSelect');
  bookSelect.value = book;
  bookSelect.dispatchEvent(new Event('change'));
  setTimeout(async () => {
    chapterSelect.value = String(chapter);
    chapterSelect.dispatchEvent(new Event('change'));
    await window.api.logReading(book, chapter, 1, 0);
  }, 100);
}

async function markVerseSeenInline(book, chapter, verse) {
  await window.api.markVerseSeen(book, chapter, verse);
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingTimeout = setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
  }, 10000);
  initApp().finally(() => {
    clearTimeout(loadingTimeout);
    document.getElementById('loadingScreen').style.display = 'none';
  });
  window.api.onBibleNotLoaded(() => showBibleNotice(false));
  window.api.onBibleLoaded(async () => {
    hideBibleNotice();
    await updateDashboard();
    if (currentPage === 'bible-reader') {
      await setupBibleReader();
    }
  });
});

async function initApp() {
  updateDate();
  await updateDashboard();
  await updateSpiritualTemp();
  setupNavigation();
  setupSearch();
  setupThemeToggle();
  setupInstallButton();
  setupEventDelegation();
  setupWindowControls();
  setupSolarControls();

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]');
    if (link) {
      e.preventDefault();
      window.api.openExternal(link.href);
    }
  });

  const status = await window.api.getBibleStatus();
  if (!status.loaded) showBibleNotice(true);
}

function setupEventDelegation() {
  document.addEventListener('click', async (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const book = target.dataset.book;
    const chapter = parseInt(target.dataset.chapter);
    const verse = parseInt(target.dataset.verse);
    const id = parseInt(target.dataset.id);
    const index = parseInt(target.dataset.index);

    switch (action) {
      case 'navigate-reading':
        if (book && chapter) await navigateToReading(book, chapter);
        break;
      case 'mark-verse-seen':
        if (book && chapter && verse) await markVerseSeenInline(book, chapter, verse);
        break;
      case 'toggle-bookmark':
        if (book && chapter && verse) await toggleBookmark(book, chapter, verse, target.dataset.text);
        break;
      case 'delete-prayer':
        if (id) await deletePrayer(id);
        break;
      case 'delete-note':
        if (id) await deleteNote(id);
        break;
      case 'play-sermon':
        if (target.dataset.code) playSermon(target.dataset.code);
        break;
      case 'search-result':
        if (book && chapter) await navigateToReading(book, chapter);
        break;
      case 'suggestion-item':
        if (book && chapter) await navigateToReading(book, chapter);
        break;
      case 'related-verse':
        if (book && chapter) await navigateToReading(book, chapter);
        break;
      case 'coach-read':
        if (book && chapter) await navigateToReading(book, chapter);
        break;
      case 'accept-verse':
        document.querySelectorAll('[data-action="accept-verse"]').forEach(b => { b.classList.remove('accepted'); b.textContent = '+ Accept'; });
        target.classList.add('accepted');
        target.textContent = '\u2713 Accepted';
        document.getElementById('prayerVerseRef').value = target.dataset.ref;
        toast('Verse added: ' + target.dataset.ref, 'success');
        break;
      case 'edit-note':
        if (id) {
          const note = notesCache.find(n => n.id === id);
          if (note) {
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteContent').value = note.content;
            document.getElementById('noteVerseRef').value = note.book ? `${note.book} ${note.chapter || ''}:${note.verse || ''}` : '';
            document.getElementById('noteComposer').style.display = 'block';
          }
        }
        break;
      case 'quiz-answer':
        selectAnswer(index, parseInt(target.dataset.points));
        break;
    }
  });

  document.getElementById('dashNewVerse').onclick = async () => { await loadDashDailyVerse(); toast('New verse loaded!', 'success'); };
  document.getElementById('prevVerse').onclick = async () => { await loadDailyVerse('prev'); };
  document.getElementById('nextVerse').onclick = async () => { await loadDailyVerse('next'); };
  document.getElementById('saveDailyVerse').onclick = async () => {
    const ref = document.getElementById('dailyVerseRef').textContent;
    const text = document.getElementById('dailyVerseText').textContent;
    const parsed = parseVerseReference(ref);
    if (parsed) {
      await window.api.saveNote(ref, text, parsed.book, parsed.chapter, parsed.verse);
      toast('Verse saved to notes!', 'success');
    }
  };
  document.getElementById('retakeQuiz').onclick = async () => {
    const today = new Date().toISOString().split('T')[0];
    const results = await window.api.getQuizResults();
    const todayResult = results.find(r => r.date === today);
    if (todayResult) {
      toast('You already completed today\'s quiz. Come back tomorrow! 🙏', 'info');
      return;
    }
    await setupQuiz();
  };
}

function setupInstallButton() {
  const installBtn = document.getElementById('installBtn');
  if (!installBtn) return;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
  });
  installBtn.onclick = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
  };
}

function showBibleNotice(showLoading) {
  let notice = document.getElementById('bibleLoadingNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'bibleLoadingNotice';
    notice.className = 'bible-not-loaded-notice';
    document.querySelector('.main-content').prepend(notice);
  }
  notice.innerHTML = showLoading ? '<strong>KJV Bible loading...</strong> This may take a moment.' : '<strong>Bible not loaded.</strong> Please ensure KJV data is available and restart.';
  notice.style.display = 'block';
}

function hideBibleNotice() {
  const notice = document.getElementById('bibleLoadingNotice');
  if (notice) notice.style.display = 'none';
}

function updateDate() {
  const now = new Date();
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.page);
      // Close drawer on mobile item tap
      document.querySelector('.sidebar')?.classList.remove('open');
      document.getElementById('sidebarOverlay')?.classList.remove('active');
    });
  });

  // Mobile sidebar drawer & overlay backdrop controllers
  const menuToggle = document.getElementById('menuToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }
}

async function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`.nav-btn[data-page="${page}"]`).forEach(b => b.classList.add('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');
  await window.api.logActivity('page_visit', page);

  switch (page) {
    case 'dashboard': await updateDashboard(); break;
    case 'daily-verse': await loadDailyVerse(); break;
    case 'bible-reader': await setupBibleReader(); break;
    case 'prayers': await loadPrayers(); break;
    case 'quiz': await setupQuiz(); break;
    case 'sermons': await loadSermons(); break;
    case 'lessons': await loadLessons(); break;
    case 'notes': await loadNotes(); break;
    case 'bookmarks': await loadBookmarks(); break;
    case 'stats': await updateStats(); break;
  }
}

async function updateDashboard() {
  const hour = new Date().getHours();
  const greeting = GREETINGS.find(g => hour >= g.hour[0] && hour < g.hour[1]) || GREETINGS[0];
  document.getElementById('greetingText').textContent = greeting.text;

  const stats = await window.api.getStats();
  document.getElementById('statPrayers').textContent = stats.prayers;
  document.getElementById('statVerses').textContent = stats.versesRead;
  document.getElementById('statUnique').textContent = stats.uniqueVerses;
  document.getElementById('statStreak').textContent = stats.streak;

  await loadDashDailyVerse();
  await loadDashSuggestions();
  await loadDashContinue();
  await updateDailyGoals(stats);
}

async function updateDailyGoals(stats) {
  const today = new Date().toISOString().split('T')[0];
  const quizDone = await window.api.getTodayQuiz(today);
  const history = await window.api.getReadingHistory(50);
  const todayRead = history.filter(h => h.read_at.startsWith(today)).length;
  const prayers = await window.api.getPrayers();
  const todayPrayed = prayers.filter(p => p.created_at.startsWith(today)).length > 0;

  document.getElementById('goalPrayer').checked = todayPrayed;
  document.getElementById('goalBible').checked = todayRead >= 5;
  document.getElementById('goalQuiz').checked = !!quizDone;
}

async function loadDashDailyVerse() {
  const verse = await window.api.getRandomUnseenVerse();
  if (verse) {
    document.getElementById('dashDailyVerse').innerHTML = `<div class="verse-ref">${verse.book} ${verse.chapter}:${verse.verse}</div><div class="verse-text">${verse.text}</div>`;
    await window.api.markVerseSeen(verse.book, verse.chapter, verse.verse);
  }
}

async function loadDashSuggestions() {
  const verses = await window.api.getPersonalizedVerses(5);
  const container = document.getElementById('dashSuggested');
  if (verses.length > 0) {
    container.innerHTML = verses.map(v => `<div class="suggestion-item" data-action="suggestion-item" data-book="${v.book}" data-chapter="${v.chapter}"><span class="verse-text">${v.text}</span><span class="verse-ref">${v.book} ${v.chapter}:${v.verse}</span></div>`).join('');
  } else {
    container.innerHTML = '<p style="color:var(--text-muted)">Start reading to get personalized suggestions!</p>';
  }
}

async function loadDashContinue() {
  const history = await window.api.getReadingHistory(1);
  const container = document.getElementById('dashContinue');
  if (history.length > 0) {
    const h = history[0];
    container.innerHTML = `<div class="continue-section"><div class="last-read"><div class="book-name">${h.book} ${h.chapter}</div><div class="last-verse">Last read: verse ${h.verse}</div></div><button class="btn-primary btn-sm" data-action="navigate-reading" data-book="${h.book}" data-chapter="${h.chapter}">Continue Reading</button></div>`;
  } else {
    container.innerHTML = '<p style="color:var(--text-muted)">Start reading the Bible to see your progress here!</p>';
  }
}

async function loadDailyVerse(direction) {
  if (direction === 'prev' && dailyVerseIndex > 0) {
    dailyVerseIndex--;
  } else if (direction === 'next' && dailyVerseIndex < dailyVerseHistory.length - 1) {
    dailyVerseIndex++;
  } else {
    const verse = await window.api.getRandomUnseenVerse();
    if (verse) {
      dailyVerseHistory.push({ book: verse.book, chapter: verse.chapter, verse: verse.verse, text: verse.text });
      dailyVerseIndex = dailyVerseHistory.length - 1;
      await window.api.markVerseSeen(verse.book, verse.chapter, verse.verse);
      await window.api.logDailyVerse(new Date().toISOString().split('T')[0], verse.book, verse.chapter, verse.verse);
    }
  }
  const entry = dailyVerseHistory[dailyVerseIndex];
  if (entry) {
    document.getElementById('dailyVerseRef').textContent = `${entry.book} ${entry.chapter}:${entry.verse}`;
    document.getElementById('dailyVerseText').textContent = entry.text;
    document.getElementById('dailyVerseDate').textContent = new Date().toLocaleDateString();
  }
}

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

const BOOK_ABBREVIATIONS = {
  'gen': 'Genesis', 'ex': 'Exodus', 'exo': 'Exodus', 'lev': 'Leviticus', 'num': 'Numbers', 'dt': 'Deuteronomy', 'deut': 'Deuteronomy',
  'josh': 'Joshua', 'judg': 'Judges', 'jdg': 'Judges', 'rt': 'Ruth', 'rut': 'Ruth',
  '1 sam': '1 Samuel', '1sam': '1 Samuel', '1s': '1 Samuel', '2 sam': '2 Samuel', '2sam': '2 Samuel', '2s': '2 Samuel',
  '1 ki': '1 Kings', '1kings': '1 Kings', '1k': '1 Kings', '2 ki': '2 Kings', '2kings': '2 Kings', '2k': '2 Kings',
  '1 chr': '1 Chronicles', '1chron': '1 Chronicles', '1chronicles': '1 Chronicles', '2 chr': '2 Chronicles', '2chron': '2 Chronicles', '2chronicles': '2 Chronicles',
  'ezr': 'Ezra', 'neh': 'Nehemiah', 'est': 'Esther', 'esth': 'Esther', 'jb': 'Job', 'ps': 'Psalms', 'psa': 'Psalms', 'psalm': 'Psalms', 'prov': 'Proverbs', 'pr': 'Proverbs',
  'eccl': 'Ecclesiastes', 'ecc': 'Ecclesiastes', 'song': 'Song of Solomon', 'songs': 'Song of Solomon', 'canticles': 'Song of Solomon',
  'isa': 'Isaiah', 'is': 'Isaiah', 'jer': 'Jeremiah', 'jr': 'Jeremiah', 'lam': 'Lamentations', 'ezek': 'Ezekiel', 'ezk': 'Ezekiel', 'dan': 'Daniel', 'dn': 'Daniel',
  'hos': 'Hosea', 'jl': 'Joel', 'joe': 'Joel', 'am': 'Amos', 'ob': 'Obadiah', 'obad': 'Obadiah', 'jon': 'Jonah', 'mic': 'Micah', 'nah': 'Nahum', 'hab': 'Habakkuk',
  'zeph': 'Zephaniah', 'zph': 'Zephaniah', 'hag': 'Haggai', 'zech': 'Zechariah', 'zec': 'Zechariah', 'mal': 'Malachi', 'ml': 'Malachi',
  'matt': 'Matthew', 'mat': 'Matthew', 'mt': 'Matthew', 'mk': 'Mark', 'mrk': 'Mark', 'lk': 'Luke', 'luk': 'Luke', 'jn': 'John', 'joh': 'John', 'act': 'Acts',
  'rom': 'Romans', 'rm': 'Romans', '1 cor': '1 Corinthians', '1cor': '1 Corinthians', '2 cor': '2 Corinthians', '2cor': '2 Corinthians',
  'gal': 'Galatians', 'eph': 'Ephesians', 'phil': 'Philippians', 'php': 'Philippians', 'col': 'Colossians', 'cl': 'Colossians',
  '1 thess': '1 Thessalonians', '1thess': '1 Thessalonians', '1th': '1 Thessalonians', '2 thess': '2 Thessalonians', '2thess': '2 Thessalonians', '2th': '2 Thessalonians',
  '1 tim': '1 Timothy', '1tim': '1 Timothy', '2 tim': '2 Timothy', '2tim': '2 Timothy', 'tit': 'Titus', 'phlm': 'Philemon', 'phile': 'Philemon',
  'heb': 'Hebrews', 'jas': 'James', 'jam': 'James', '1 pet': '1 Peter', '1pet': '1 Peter', '2 pet': '2 Peter', '2pet': '2 Peter',
  '1 jn': '1 John', '1jn': '1 John', '1j': '1 John', '2 jn': '2 John', '2jn': '2 John', '2j': '2 John', '3 jn': '3 John', '3jn': '3 John', '3j': '3 John',
  'jud': 'Jude', 'rev': 'Revelation', 'revel': 'Revelation'
};

function resolveBookName(query) {
  if (!query) return '';
  const clean = query.trim().toLowerCase().replace(/\s+/g, ' ').replace(/\./g, '');
  
  if (BOOK_ABBREVIATIONS[clean]) {
    return BOOK_ABBREVIATIONS[clean];
  }
  
  const directMatch = BIBLE_BOOKS.find(b => b.toLowerCase() === clean);
  if (directMatch) return directMatch;
  
  const startsWithMatch = BIBLE_BOOKS.find(b => b.toLowerCase().startsWith(clean));
  if (startsWithMatch) return startsWithMatch;
  
  return '';
}

function parseVerseReference(verseRef) {
  if (!verseRef) return null;
  // Regex that matches:
  // Group 1: Book name: numbers, letters, spaces (multi-word support)
  // Group 2: Chapter: digits
  // Group 3: Optional colon or dot, followed by digits (start verse)
  // Group 4: Optional dash followed by digits (end verse)
  const regex = /^(\d?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s*(\d+)(?:[:.](\d+))?(?:\s*-\s*(\d+))?$/;
  const match = verseRef.trim().match(regex);
  if (!match) return null;

  const rawBook = match[1].trim();
  const book = resolveBookName(rawBook) || rawBook;
  const chapter = parseInt(match[2], 10);
  const verse = match[3] ? parseInt(match[3], 10) : null;
  const endVerse = match[4] ? parseInt(match[4], 10) : null;

  return { book, chapter, verse, endVerse };
}

async function setupBibleReader() {
  const books = await window.api.getBookNames();
  const bookSelect = document.getElementById('bookSelect');
  const chapterSelect = document.getElementById('chapterSelect');
  const versionSelect = document.getElementById('versionSelect');

  const SUPPORTED_VERSIONS = {
    kjv: 'KJV',
    asv: 'ASV',
    web: 'WEB',
    bsb: 'BSB',
    dra: 'DRA',
    rv: 'RV',
    t4t: 'T4T'
  };

  const status = await window.api.getBibleStatus();
  const optionsHtml = Object.entries(SUPPORTED_VERSIONS).map(([vCode, vName]) => {
    const isDownloaded = status.versions[vCode];
    return `<option value="${vCode}">${vName}${isDownloaded ? '' : ' (Click to Download)'}</option>`;
  }).join('');
  versionSelect.innerHTML = optionsHtml;
  versionSelect.value = status.currentVersion || 'kjv';

  bookSelect.innerHTML = '<option value="">Select Book</option>' + books.map(b => `<option value="${b}">${b}</option>`).join('');
  chapterSelect.innerHTML = '<option value="">Chapter</option>';

  versionSelect.onchange = async () => {
    const v = versionSelect.value;
    const oldVersion = status.currentVersion || 'kjv';
    if (v === oldVersion) return;

    // Check if selected version is already downloaded
    const currentStatus = await window.api.getBibleStatus();
    const isDownloaded = currentStatus.versions[v];

    if (!isDownloaded) {
      toast(`Downloading and compiling ${v.toUpperCase()} Bible from CDN... This can take ~15s. Please wait.`, 'info');
    } else {
      toast(`Switching to ${v.toUpperCase()}...`, 'info');
    }

    // Temporarily disable the dropdown to prevent multiple parallel download triggers
    versionSelect.disabled = true;

    try {
      const res = await window.api.setBibleVersion(v);
      if (res.success) {
        toast(`Switched to ${v.toUpperCase()}`, 'success');

        // Refresh dropdown options labels to remove the "(Click to Download)" suffix
        const newStatus = await window.api.getBibleStatus();
        const newOptionsHtml = Object.entries(SUPPORTED_VERSIONS).map(([vCode, vName]) => {
          const loaded = newStatus.versions[vCode];
          return `<option value="${vCode}">${vName}${loaded ? '' : ' (Click to Download)'}</option>`;
        }).join('');
        versionSelect.innerHTML = newOptionsHtml;
        versionSelect.value = v;

        const book = bookSelect.value;
        const chapter = parseInt(chapterSelect.value);
        if (book && chapter) await loadChapter(book, chapter);
      } else {
        toast(`Failed to load/download ${v.toUpperCase()} Bible. Please check your network connection.`, 'error');
        versionSelect.value = oldVersion;
      }
    } catch (e) {
      console.error(e);
      toast(`Error switching to ${v.toUpperCase()}: ${e.message}`, 'error');
      versionSelect.value = oldVersion;
    } finally {
      versionSelect.disabled = false;
    }
  };

  bookSelect.onchange = async () => {
    const book = bookSelect.value;
    if (!book) return;
    const chapters = await window.api.getChaptersForBook(book);
    chapterSelect.innerHTML = '<option value="">Chapter</option>' + chapters.map(c => `<option value="${c}">${c}</option>`).join('');
  };

  chapterSelect.onchange = async () => {
    const book = bookSelect.value;
    const chapter = parseInt(chapterSelect.value);
    if (book && chapter) await loadChapter(book, chapter);
  };

  document.getElementById('goToVerses').onclick = async () => {
    const book = bookSelect.value;
    const chapter = parseInt(chapterSelect.value);
    const start = parseInt(document.getElementById('verseStart').value);
    const end = parseInt(document.getElementById('verseEnd').value);
    if (book && chapter) {
      if (start && end) await loadVerses(book, chapter, start, end);
      else await loadChapter(book, chapter);
    }
  };

  // Quick verse jump (BLB-style)
  const jumpInput = document.getElementById('verseJump');
  const jumpBtn = document.getElementById('jumpBtn');
  const doJump = async () => {
    const ref = parseVerseReference(jumpInput.value.trim());
    if (ref) {
      const chapters = await window.api.getChaptersForBook(ref.book);
      if (chapters.includes(ref.chapter)) {
        bookSelect.value = ref.book;
        // Populate chapterSelect options synchronously to avoid empty option state
        const chaptersForBook = await window.api.getChaptersForBook(ref.book);
        chapterSelect.innerHTML = '<option value="">Chapter</option>' + chaptersForBook.map(c => `<option value="${c}">${c}</option>`).join('');
        chapterSelect.value = String(ref.chapter);
        
        if (ref.verse) {
          await loadVerses(ref.book, ref.chapter, ref.verse, ref.endVerse || ref.verse);
        } else {
          await loadChapter(ref.book, ref.chapter);
        }
      } else {
        toast('Chapter not found in ' + ref.book, 'error');
      }
    } else {
      toast('Invalid reference. Use format: Book Chapter:Verse (e.g. John 3:16) or Book Chapter (e.g. Genesis 1)', 'error');
    }
  };
  jumpBtn.onclick = doJump;
  jumpInput.onkeydown = (e) => { if (e.key === 'Enter') doJump(); };

  // Full-screen reader toggle
  const fsBtn = document.getElementById('readerFullscreenBtn');
  let isFullscreen = false;
  fsBtn.onclick = () => {
    isFullscreen = !isFullscreen;
    document.getElementById('app').classList.toggle('reader-fullscreen', isFullscreen);
    fsBtn.classList.toggle('active', isFullscreen);
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      isFullscreen = false;
      document.getElementById('app').classList.remove('reader-fullscreen');
      fsBtn.classList.remove('active');
    }
  });

  // Copy verse on click (BLB-style)
  document.getElementById('bibleText').addEventListener('click', async (e) => {
    const row = e.target.closest('.verse-row');
    if (row) {
      const verseNum = row.querySelector('.verse-num');
      const verseContent = row.querySelector('.verse-content');
      if (verseNum && verseContent) {
        const ref = `${verseNum.dataset.book} ${verseNum.dataset.chapter}:${verseNum.dataset.verse}`;
        const text = verseContent.textContent.trim();
        try {
          await navigator.clipboard.writeText(`${ref} ${text}`);
          toast('Verse copied!', 'success');
        } catch {
          toast('Copy failed', 'error');
        }
      }
    }
  });
}

async function loadChapter(book, chapter) {
  const verses = await window.api.getChapter(book, chapter);
  document.getElementById('chapterTitle').textContent = `${book} - Chapter ${chapter}`;
  displayVerses(verses);
  await window.api.logReading(book, chapter, verses[0]?.verse || 1, 0);
  const chapters = await window.api.getChaptersForBook(book);
  const nav = document.getElementById('readerFooterNav');
  nav.style.display = 'flex';
  document.getElementById('readerLocation').textContent = `${book} ${chapter}`;
  const prevBtn = document.getElementById('readerPrevChapter');
  const nextBtn = document.getElementById('readerNextChapter');
  if (chapter > 1) {
    prevBtn.onclick = () => loadChapter(book, chapter - 1);
    prevBtn.disabled = false;
    prevBtn.style.opacity = '1';
  } else {
    prevBtn.disabled = true;
    prevBtn.style.opacity = '0.4';
  }
  if (chapter < chapters.length) {
    nextBtn.onclick = () => loadChapter(book, chapter + 1);
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
  } else {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.4';
  }
}

async function loadVerses(book, chapter, start, end) {
  const verses = await window.api.getVerses(book, chapter, start, end);
  document.getElementById('chapterTitle').textContent = `${book} ${chapter}:${start}-${end}`;
  displayVerses(verses);
  await window.api.logReading(book, chapter, start, 0);
}

async function displayVerses(verses) {
  const container = document.getElementById('bibleText');
  const bookmarks = await window.api.getBookmarks();
  const bookmarkedSet = new Set(bookmarks.map(b => `${b.book}|${b.chapter}|${b.verse}`));

  container.innerHTML = verses.map(v => {
    const isBookmarked = bookmarkedSet.has(`${v.book}|${v.chapter}|${v.verse}`);
    return `<div class="verse-row">
      <span class="verse-num" data-action="mark-verse-seen" data-book="${v.book}" data-chapter="${v.chapter}" data-verse="${v.verse}">${v.verse}</span>
      <span class="verse-content">${v.text}</span>
      <button class="bookmark-btn-toggle ${isBookmarked ? 'active' : ''}" 
        data-action="toggle-bookmark" 
        data-book="${v.book}" 
        data-chapter="${v.chapter}" 
        data-verse="${v.verse}" 
        data-text="${v.text.replace(/"/g, '&quot;')}">
        <svg class="bmk-off" viewBox="0 0 24 24" width="16" height="16"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        <svg class="bmk-on" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>`;
  }).join('');
}

async function loadPrayers() {
  const prayers = await window.api.getPrayers();
  const container = document.getElementById('prayersList');
  if (prayers.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">🙏</div>
      <h4>No prayers yet</h4>
      <p>Pour out your heart to the Lord. Click "New Prayer" to begin your prayer journey.</p>
    </div>`;
  } else {
    container.innerHTML = prayers.map(p => `<div class="prayer-item"><div class="prayer-text">${p.content}</div><div class="prayer-meta"><span>${p.verse_reference || ''} ${new Date(p.created_at).toLocaleDateString()}</span><button class="delete-btn" data-action="delete-prayer" data-id="${p.id}">Delete</button></div></div>`).join('');
  }

  document.getElementById('newPrayerBtn').onclick = () => { document.getElementById('prayerComposer').style.display = 'block'; document.getElementById('prayerText').focus(); };
  document.getElementById('cancelPrayer').onclick = () => { document.getElementById('prayerComposer').style.display = 'none'; document.getElementById('prayerText').value = ''; document.getElementById('prayerVerseRef').value = ''; document.getElementById('prayerSuggestion').style.display = 'none'; };

  document.getElementById('prayerText').oninput = debounce(async () => {
    const text = document.getElementById('prayerText').value.trim();
    if (text.length < 15) { document.getElementById('prayerSuggestion').style.display = 'none'; return; }
    const sug = document.getElementById('prayerSuggestion');
    const topicHints = {
      forgiveness: { keywords: ['forgive', 'forgiven', 'forgiveness', 'transgress', 'sin against', 'trespass'], verses: ['Matthew 6:14-15', 'Ephesians 4:32', 'Colossians 3:13'] },
      healing: { keywords: ['heal', 'sickness', 'disease', 'pain', 'sick', 'illness'], verses: ['Exodus 15:26', 'Psalm 103:2-3', 'Isaiah 53:5', 'James 5:14-15'] },
      strength: { keywords: ['strength', 'weak', 'tired', 'weary', 'power', 'courage'], verses: ['Isaiah 40:31', 'Philippians 4:13', 'Ephesians 6:10', '2 Corinthians 12:9-10'] },
      provision: { keywords: ['provide', 'need', 'money', 'food', 'bill', 'financial', 'job', 'work'], verses: ['Philippians 4:19', 'Matthew 6:25-33', 'Psalm 23:1', 'Malachi 3:10'] },
      peace: { keywords: ['peace', 'anxiety', 'worry', 'fear', 'afraid', 'stress', 'calm'], verses: ['John 14:27', 'Philippians 4:6-7', 'Psalm 29:11', 'Isaiah 26:3'] },
      guidance: { keywords: ['guid', 'direction', 'wisdom', 'show me', 'lead', 'path', 'way'], verses: ['Proverbs 3:5-6', 'Psalm 32:8', 'James 1:5', 'Jeremiah 29:11'] },
      protection: { keywords: ['protect', 'safety', 'safe', 'danger', 'enemy', 'guard'], verses: ['Psalm 91:1-4', 'Isaiah 54:17', 'Psalm 121:7-8', '2 Thessalonians 3:3'] },
      love: { keywords: ['love', 'heart', 'relationship', 'family', 'marriage', 'children'], verses: ['1 Corinthians 13:4-7', 'John 3:16', 'Romans 8:38-39', '1 John 4:18-19'] },
      thankfulness: { keywords: ['thank', 'grateful', 'bless', 'praise', 'worship', 'thanksgiving'], verses: ['Psalm 100:4', '1 Thessalonians 5:18', 'Psalm 136:1', 'Colossians 3:15-17'] },
    };
    let matched = [];
    for (const [, hint] of Object.entries(topicHints)) {
      if (hint.keywords.some(k => text.toLowerCase().includes(k))) {
        matched = hint.verses;
        break;
      }
    }
    if (matched.length > 0) {
      const refs = await Promise.all(matched.map(async (v) => {
        const parsed = parseVerseReference(v);
        if (parsed) {
          const verse = await window.api.getVerse(parsed.book, parsed.chapter, parsed.verse);
          return verse ? { ref: v, text: verse.text } : null;
        }
        return null;
      }));
      const valid = refs.filter(Boolean);
      if (valid.length > 0) {
        sug.innerHTML = '<div class="verse-suggestion-header">Suggested Verses</div>' + valid.map((v, i) => `<div class="verse-suggestion-item" data-sug-index="${i}"><span class="vs-ref">${v.ref}</span><span class="vs-text">${v.text.substring(0, 80)}...</span><button class="btn-accept" data-action="accept-verse" data-ref="${v.ref}">+ Accept</button></div>`).join('');
        sug.style.display = 'block';
      } else {
        sug.style.display = 'none';
      }
    } else {
      sug.style.display = 'none';
    }
  }, 500);

  document.getElementById('savePrayerBtn').onclick = async () => {
    const content = document.getElementById('prayerText').value.trim();
    if (!content) return;
    let verseRef = document.getElementById('prayerVerseRef').value.trim();
    if (!verseRef) {
      const accepted = document.querySelector('[data-action="accept-verse"].accepted');
      if (accepted) verseRef = accepted.dataset.ref;
    }
    await window.api.savePrayer(content, verseRef || null);
    document.getElementById('prayerComposer').style.display = 'none';
    document.getElementById('prayerText').value = '';
    document.getElementById('prayerVerseRef').value = '';
    document.getElementById('prayerSuggestion').style.display = 'none';
    await loadPrayers();
    await updateSpiritualTemp();
    toast('Prayer saved!', 'success');
  };
}

async function deletePrayer(id) {
  if (await showConfirm('Delete this prayer?')) {
    await window.api.deletePrayer(id);
    await loadPrayers();
    toast('Prayer deleted', 'info');
  }
}

function getTestament(book) {
  const OT = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
  const NT = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  if (OT.includes(book)) return 'Old Testament';
  if (NT.includes(book)) return 'New Testament';
  return 'General';
}

function buildTree(items, getBook) {
  const groups = {};
  for (const item of items) {
    const book = getBook(item);
    const testament = getTestament(book);
    const key = testament + '|||' + book;
    if (!groups[key]) groups[key] = { testament, book, items: [] };
    groups[key].items.push(item);
  }
  const result = {};
  for (const [, g] of Object.entries(groups)) {
    if (!result[g.testament]) result[g.testament] = {};
    if (!result[g.testament][g.book]) result[g.testament][g.book] = [];
    result[g.testament][g.book].push(...g.items);
  }
  return result;
}

function renderTree(container, tree, renderLeaf, toggleId) {
  let html = '<div class="tree-container">';
  for (const [testament, books] of Object.entries(tree)) {
    const totalItems = Object.values(books).reduce((s, v) => s + v.length, 0);
    const tid = toggleId + '-' + testament.replace(/\s/g, '');
    html += `<div class="tree-node"><div class="tree-row" onclick="toggleTree('${tid}')"><span class="tree-toggle" id="tog-${tid}">\u25B6</span><svg class="tree-icon" viewBox="0 0 24 24" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><span class="tree-label">${testament}</span><span class="tree-meta">${totalItems}</span></div><div class="tree-children" id="child-${tid}" style="display:none;">`;
    for (const [book, bookItems] of Object.entries(books)) {
      const bid = tid + '-' + book.replace(/\s/g, '');
      html += `<div class="tree-node"><div class="tree-row" onclick="toggleTree('${bid}')"><span class="tree-toggle" id="tog-${bid}">\u25B6</span><svg class="tree-icon" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg><span class="tree-label">${book}</span><span class="tree-meta">${bookItems.length}</span></div><div class="tree-children" id="child-${bid}" style="display:none;">`;
      for (const item of bookItems) {
        html += renderLeaf(item);
      }
      html += '</div></div>';
    }
    html += '</div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

window.toggleTree = function(id) {
  const child = document.getElementById('child-' + id);
  const tog = document.getElementById('tog-' + id);
  if (!child || !tog) return;
  const isHidden = child.style.display === 'none';
  child.style.display = isHidden ? 'flex' : 'none';
  tog.classList.toggle('open', isHidden);
};

/* ===== SOLAR SYSTEM NOTES ===== */
let solarZoom = 1;
let solarRotation = true;
let solarAngleOffset = 0;
let solarTiltX = 0;
let solarTiltY = 0;
let solarDragState = null;
let solarAnimId = null;
let solarInitialized = false;
const SOLAR_ORBITS = [
  { radius: 100, maxPlanets: 3 },
  { radius: 160, maxPlanets: 4 },
  { radius: 220, maxPlanets: 5 },
  { radius: 280, maxPlanets: 6 },
];

const SOLAR_NOTE_COLORS = {
  'nt': { bg: ['#a5b4fc','#818cf8','#6366f1','#4338ca'], className: 'nt-moon' },
  'ot': { bg: ['#fde68a','#fbbf24','#f59e0b','#b45309'], className: 'ot-moon' },
  'general': { bg: ['#a7f3d0','#34d399','#059669','#047857'], className: 'general-moon' },
};

function getNoteCategory(note) {
  const ot = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
  const nt = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  const book = note.book || '';
  if (ot.includes(book)) return 'ot';
  if (nt.includes(book)) return 'nt';
  return 'general';
}

function getTestamentColor(book) {
  const ot = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
  const nt = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  if (ot.includes(book)) return 'testament-ot';
  if (nt.includes(book)) return 'testament-nt';
  return 'testament-general';
}

function groupNotesByBook(notes) {
  const groups = {};
  const bookOrder = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  
  for (const note of notes) {
    const book = note.book || 'General';
    if (!groups[book]) groups[book] = [];
    groups[book].push(note);
  }
  
  return Object.entries(groups)
    .sort(([a], [b]) => {
      const ai = bookOrder.indexOf(a);
      const bi = bookOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map(([book, notes], i) => ({ book, notes }));
}

function assignOrbits(groups) {
  const planets = [];
  let orbitIdx = 0;
  let angleStep = 0;
  let countInOrbit = 0;

  for (let i = 0; i < groups.length; i++) {
    const orbit = SOLAR_ORBITS[Math.min(orbitIdx, SOLAR_ORBITS.length - 1)];
    const maxInOrbit = orbit.maxPlanets;
    
    if (countInOrbit === 0) {
      const remaining = groups.length - i;
      const planetsForThisOrbit = Math.min(maxInOrbit, remaining);
      angleStep = (2 * Math.PI) / planetsForThisOrbit;
    }
    
    const angle = countInOrbit * angleStep;
    const x = orbit.radius * Math.cos(angle);
    const y = orbit.radius * Math.sin(angle);
    const size = Math.max(36, Math.min(60, 36 + groups[i].notes.length * 4));
    
    planets.push({
      ...groups[i],
      orbitRadius: orbit.radius,
      baseAngle: angle,
      x,
      y,
      size,
      testament: getTestamentColor(groups[i].book),
    });
    
    countInOrbit++;
    if (countInOrbit >= maxInOrbit || i === groups.length - 1) {
      orbitIdx++;
      countInOrbit = 0;
    }
  }
  
  // Collect unique orbit radii for orbit rings
  const radii = [...new Set(planets.map(p => p.orbitRadius))].sort((a, b) => a - b);
  
  return { planets, rings: radii };
}

function updateSolarPositions() {
  const cx = 400, cy = 300;
  document.querySelectorAll('.planet-group').forEach(el => {
    const baseAngle = parseFloat(el.dataset.baseAngle);
    const orbit = parseFloat(el.dataset.orbit);
    if (isNaN(baseAngle) || isNaN(orbit)) return;
    const angle = baseAngle + solarAngleOffset;
    el.style.left = (cx + orbit * Math.cos(angle)) + 'px';
    el.style.top = (cy + orbit * Math.sin(angle)) + 'px';
  });
}

function initSolarDrag() {
  const container = document.getElementById('solarSystemContainer');
  if (!container || container.dataset.dragInit) return;
  container.dataset.dragInit = '1';

  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.action-btn, .moon, .planet-group, .sun, .solar-zoom-controls, .note-composer, .notes-actions')) return;
    solarDragState = { startX: e.clientX, startOffset: solarAngleOffset, wasDragged: false };
    container.style.cursor = 'grabbing';
    container.classList.add('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!solarDragState) return;
    const dx = e.clientX - solarDragState.startX;
    if (Math.abs(dx) > 3) solarDragState.wasDragged = true;
    solarAngleOffset = solarDragState.startOffset + dx * 0.005;
    updateSolarPositions();
  });

  document.addEventListener('mouseup', () => {
    if (!solarDragState) return;
    container.style.cursor = 'grab';
    container.classList.remove('dragging');
    solarDragState = null;
  }, { once: false });

  container.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch support
  container.addEventListener('touchstart', (e) => {
    if (e.target.closest('.action-btn, .moon, .planet-group, .sun, .solar-zoom-controls, .note-composer, .notes-actions')) return;
    const t = e.touches[0];
    solarDragState = { startX: t.clientX, startOffset: solarAngleOffset, wasDragged: false };
    container.classList.add('dragging');
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!solarDragState) return;
    const t = e.touches[0];
    const dx = t.clientX - solarDragState.startX;
    if (Math.abs(dx) > 3) solarDragState.wasDragged = true;
    solarAngleOffset = solarDragState.startOffset + dx * 0.005;
    updateSolarPositions();
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (!solarDragState) return;
    container.classList.remove('dragging');
    solarDragState = null;
  }, { passive: true });
}

function initSolarParallax() {
  const container = document.getElementById('solarSystemContainer');
  if (!container || container.dataset.parallaxInit) return;
  container.dataset.parallaxInit = '1';

  container.addEventListener('mousemove', (e) => {
    if (solarDragState && solarDragState.wasDragged) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    solarTiltX = (y - 0.5) * -6;
    solarTiltY = (x - 0.5) * 6;
    applySolarZoom();
  });

  container.addEventListener('mouseleave', () => {
    solarTiltX = 0;
    solarTiltY = 0;
    const system = document.getElementById('solarSystem');
    if (system) {
      system.style.transition = 'transform 0.6s ease';
      applySolarZoom();
      setTimeout(() => { if (system) system.style.transition = ''; }, 600);
    }
  });
}

function startSolarAnimation() {
  if (solarAnimId) return;
  function tick() {
    if (solarRotation) {
      solarAngleOffset += 0.0015;
      updateSolarPositions();
    }
    solarAnimId = requestAnimationFrame(tick);
  }
  solarAnimId = requestAnimationFrame(tick);
}

async function loadNotes() {
  notesCache = await window.api.getNotes();
  const notes = notesCache;

  // Bind view switch buttons
  setupNotesViewSwitcher();

  const solarContainer = document.getElementById('solarSystemContainer');
  const listContainer = document.getElementById('notesListContainer');
  const solarControls = document.getElementById('solarZoomControls');
  const composer = document.getElementById('noteComposer');
  const subtitle = document.getElementById('notesPageSubtitle');

  // Handle views
  if (currentNotesView === 'solar') {
    solarContainer.style.display = 'block';
    solarControls.style.display = 'flex';
    listContainer.style.display = 'none';
    composer.style.display = 'none';
    subtitle.textContent = "Explore your study notes orbiting God's Word";

    const solarBodies = document.getElementById('solarBodies');
    const emptyMsg = document.getElementById('solarEmpty');
    const solarSystem = document.getElementById('solarSystem');
    
    if (notes.length === 0) {
      emptyMsg.style.display = 'flex';
      solarSystem.style.display = 'none';
      generateStarfield(40);
      return;
    }
    
    emptyMsg.style.display = 'none';
    solarSystem.style.display = 'flex';
    
    const groups = groupNotesByBook(notes);
    const { planets, rings } = assignOrbits(groups);
    
    generateStarfield(60);
    
    // Orbit rings
    let html = rings.map(r =>
      `<div class="orbit-ring" style="width:${r * 2}px;height:${r * 2}px;"></div>`
    ).join('');
    
    // Planets
    for (const planet of planets) {
      html += buildSolarPlanet(planet);
    }
    
    solarBodies.innerHTML = html;
    solarAngleOffset = 0;
    updateSolarPositions();
    
    // Init drag, parallax, and animation (once)
    if (!solarInitialized) {
      solarInitialized = true;
      initSolarDrag();
      initSolarParallax();
      startSolarAnimation();
    }
    
    // Attach events
    document.querySelectorAll('.planet-group').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlanet(el);
      });
      
      el.addEventListener('mouseenter', () => {
        const name = el.dataset.book;
        const count = el.dataset.count;
        showTooltip(el, `${name} — ${count} note${count > 1 ? 's' : ''}`);
      });
      
      el.addEventListener('mouseleave', hideTooltip);
    });
    
    document.querySelectorAll('.moon').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(el.dataset.noteId);
        if (id) {
          editingNoteId = id;
          editNote(id);
        }
      });
      
      el.addEventListener('mouseenter', () => {
        const title = el.dataset.noteTitle || '';
        showTooltip(el, title);
      });
      
      el.addEventListener('mouseleave', hideTooltip);
    });

    const showSolar = () => {
      composer.style.display = 'none';
      solarContainer.style.display = 'block';
    };
    
    document.getElementById('newNoteBtn').onclick = () => {
      editingNoteId = null;
      solarContainer.style.display = 'none';
      composer.style.display = 'block';
      document.getElementById('noteTitle').value = '';
      document.getElementById('noteContent').value = '';
      document.getElementById('noteVerseRef').value = '';
      document.getElementById('noteTitle').focus();
    };

    document.getElementById('cancelNote').onclick = () => {
      showSolar();
      editingNoteId = null;
      document.getElementById('noteTitle').value = '';
      document.getElementById('noteContent').value = '';
      document.getElementById('noteVerseRef').value = '';
    };

    document.getElementById('saveNoteBtn').onclick = async () => {
      const title = document.getElementById('noteTitle').value.trim();
      const content = document.getElementById('noteContent').value.trim();
      if (!title || !content) return;
      const verseRef = document.getElementById('noteVerseRef').value.trim();
      let book = null, chapter = null, verse = null;
      if (verseRef) {
        const parsed = parseVerseReference(verseRef);
        if (parsed) {
          book = parsed.book;
          chapter = parsed.chapter;
          verse = parsed.verse;
        }
      }
      
      if (editingNoteId !== null) {
        await window.api.updateNote(editingNoteId, title, content);
        toast('Note updated!', 'success');
      } else {
        await window.api.saveNote(title, content, book, chapter, verse);
        toast('Note saved!', 'success');
      }
      
      showSolar();
      editingNoteId = null;
      document.getElementById('noteTitle').value = '';
      document.getElementById('noteContent').value = '';
      document.getElementById('noteVerseRef').value = '';
      await loadNotes();
    };

  } else {
    solarContainer.style.display = 'none';
    solarControls.style.display = 'none';
    listContainer.style.display = 'block';
    composer.style.display = 'none';
    subtitle.textContent = "Browse and search all your personal study notes and revelations";

    renderNotesListView();
  }
}

function setupNotesViewSwitcher() {
  const btnSolar = document.getElementById('btnViewSolar');
  const btnList = document.getElementById('btnViewList');
  if (!btnSolar || !btnList || btnSolar._bound) return;
  btnSolar._bound = true;

  btnSolar.onclick = () => {
    btnSolar.classList.add('active');
    btnList.classList.remove('active');
    currentNotesView = 'solar';
    loadNotes();
  };

  btnList.onclick = () => {
    btnList.classList.add('active');
    btnSolar.classList.remove('active');
    currentNotesView = 'list';
    loadNotes();
  };

  if (currentNotesView === 'solar') {
    btnSolar.classList.add('active');
    btnList.classList.remove('active');
  } else {
    btnList.classList.add('active');
    btnSolar.classList.remove('active');
  }
}

function renderNotesListView() {
  // 1. Setup New Note Button for List View
  document.getElementById('newNoteBtn').onclick = () => {
    editingNoteId = null;
    selectedNote = null;
    showInlineComposer();
  };

  // 2. Setup Search listener (once)
  const searchInput = document.getElementById('notesSearchInput');
  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener('input', debounce(() => renderNotesSidebarList(), 200));
  }

  // 3. Render categories (tabs) & notes list
  renderNotesCategories();
  renderNotesSidebarList();
  renderNotesDetailPanel();
}

function renderNotesCategories() {
  const tabsContainer = document.getElementById('notesCategoryTabs');
  if (!tabsContainer) return;

  const books = [...new Set(notesCache.map(n => n.book || 'General'))].sort();
  
  let html = `<button class="cat-btn${currentNoteFilterBook === 'all' ? ' active' : ''}" data-cat="all">All</button>`;
  
  books.forEach(b => {
    html += `<button class="cat-btn${currentNoteFilterBook === b ? ' active' : ''}" data-cat="${escapeHtml(b)}">${escapeHtml(b)}</button>`;
  });
  
  tabsContainer.innerHTML = html;

  tabsContainer.querySelectorAll('.cat-btn').forEach(btn => {
    btn.onclick = () => {
      tabsContainer.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentNoteFilterBook = btn.dataset.cat;
      renderNotesSidebarList();
    };
  });
}

function renderNotesSidebarList() {
  const listContainer = document.getElementById('notesList');
  if (!listContainer) return;

  const searchQuery = (document.getElementById('notesSearchInput')?.value || '').toLowerCase().trim();
  
  const filtered = notesCache.filter(n => {
    const bookName = n.book || 'General';
    const matchesBook = currentNoteFilterBook === 'all' || bookName === currentNoteFilterBook;
    
    const matchesSearch = !searchQuery || 
      (n.title || '').toLowerCase().includes(searchQuery) ||
      (n.content || '').toLowerCase().includes(searchQuery) ||
      bookName.toLowerCase().includes(searchQuery);
      
    return matchesBook && matchesSearch;
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `<div class="sermon-index-empty" style="padding: 24px 16px; text-align: center; color: var(--text-muted); font-size: 12px;">No notes found</div>`;
    return;
  }

  listContainer.innerHTML = filtered.map((n, i) => {
    const isActive = selectedNote && selectedNote.id === n.id;
    const dateStr = n.created_at ? new Date(n.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
    const refStr = n.book ? `${n.book} ${n.chapter || ''}:${n.verse || ''}`.trim() : '';
    const snippet = n.content ? (n.content.length > 80 ? n.content.substring(0, 80) + '...' : n.content) : '';
    
    return `
      <div class="note-index-item${isActive ? ' active' : ''}" data-id="${n.id}">
        <div class="note-index-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="note-index-info">
          <div class="note-index-title">${escapeHtml(n.title || 'Untitled')}</div>
          <div class="note-index-snippet">${escapeHtml(snippet)}</div>
          <div class="note-index-meta">
            <span class="notes-reader-date">${dateStr}</span>
            ${refStr ? `<span class="note-index-ref">${escapeHtml(refStr)}</span>` : ''}
          </div>
        </div>
        <svg class="sermon-index-arrow" viewBox="0 0 24 24" width="14" height="14" style="align-self: center; color: var(--text-muted);"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `;
  }).join('');

  listContainer.querySelectorAll('.note-index-item').forEach(item => {
    item.onclick = () => {
      const id = parseInt(item.dataset.id);
      selectedNote = notesCache.find(n => n.id === id);
      editingNoteId = null;
      
      listContainer.querySelectorAll('.note-index-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      
      renderNotesDetailPanel();
    };
  });
}

function renderNotesDetailPanel() {
  const emptyState = document.getElementById('notesEmptyState');
  const readerContent = document.getElementById('notesReaderContent');
  const inlineComposer = document.getElementById('notesInlineComposer');
  
  if (editingNoteId !== null || (editingNoteId === null && selectedNote === null && inlineComposer.style.display === 'block')) {
    showInlineComposer();
    return;
  }

  if (!selectedNote) {
    emptyState.style.display = 'flex';
    readerContent.style.display = 'none';
    inlineComposer.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  readerContent.style.display = 'block';
  inlineComposer.style.display = 'none';

  const titleEl = document.getElementById('notesReaderTitle');
  const refEl = document.getElementById('notesReaderRef');
  const dateEl = document.getElementById('notesReaderDate');
  const bodyEl = document.getElementById('notesReaderBody');

  titleEl.textContent = selectedNote.title || 'Untitled';
  dateEl.textContent = selectedNote.created_at ? new Date(selectedNote.created_at).toLocaleString() : '';
  
  const refText = selectedNote.book ? `${selectedNote.book} ${selectedNote.chapter || ''}:${selectedNote.verse || ''}`.trim() : '';
  if (refText) {
    refEl.textContent = refText;
    refEl.style.display = 'inline-block';
    refEl.onclick = async () => {
      await navigateToReading(selectedNote.book, selectedNote.chapter || 1);
    };
  } else {
    refEl.style.display = 'none';
  }

  bodyEl.textContent = selectedNote.content || '';

  document.getElementById('editNoteBtn').onclick = () => {
    editingNoteId = selectedNote.id;
    showInlineComposer();
  };

  document.getElementById('deleteNoteBtn').onclick = async () => {
    if (await showConfirm('Delete this study note?')) {
      await window.api.deleteNote(selectedNote.id);
      selectedNote = null;
      editingNoteId = null;
      toast('Note deleted', 'info');
      await loadNotes();
    }
  };
}

function showInlineComposer() {
  const emptyState = document.getElementById('notesEmptyState');
  const readerContent = document.getElementById('notesReaderContent');
  const inlineComposer = document.getElementById('notesInlineComposer');

  emptyState.style.display = 'none';
  readerContent.style.display = 'none';
  inlineComposer.style.display = 'block';

  const titleInput = document.getElementById('inlineNoteTitle');
  const refInput = document.getElementById('inlineNoteVerseRef');
  const contentInput = document.getElementById('inlineNoteContent');
  const heading = document.getElementById('notesComposerHeading');

  if (editingNoteId !== null) {
    heading.textContent = 'Edit Note';
    const note = notesCache.find(n => n.id === editingNoteId);
    if (note) {
      titleInput.value = note.title || '';
      refInput.value = note.book ? `${note.book} ${note.chapter || ''}:${note.verse || ''}`.trim() : '';
      contentInput.value = note.content || '';
    }
  } else {
    heading.textContent = 'New Note';
    titleInput.value = '';
    refInput.value = '';
    contentInput.value = '';
  }

  titleInput.focus();

  document.getElementById('inlineCancelNote').onclick = () => {
    editingNoteId = null;
    renderNotesDetailPanel();
  };

  document.getElementById('inlineSaveNoteBtn').onclick = async () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) {
      toast('Title and content are required', 'warning');
      return;
    }
    const verseRef = refInput.value.trim();
    let book = null, chapter = null, verse = null;
    if (verseRef) {
      const parsed = parseVerseReference(verseRef);
      if (parsed) {
        book = parsed.book;
        chapter = parsed.chapter;
        verse = parsed.verse;
      }
    }

    if (editingNoteId !== null) {
      await window.api.updateNote(editingNoteId, title, content);
      
      const cacheIdx = notesCache.findIndex(n => n.id === editingNoteId);
      if (cacheIdx !== -1) {
        notesCache[cacheIdx].title = title;
        notesCache[cacheIdx].content = content;
        if (verseRef) {
          notesCache[cacheIdx].book = book;
          notesCache[cacheIdx].chapter = chapter;
          notesCache[cacheIdx].verse = verse;
        }
        selectedNote = notesCache[cacheIdx];
      }
      
      toast('Note updated!', 'success');
    } else {
      const res = await window.api.saveNote(title, content, book, chapter, verse);
      
      notesCache = await window.api.getNotes();
      if (res.success && res.id) {
        selectedNote = notesCache.find(n => n.id === res.id) || notesCache[0];
      } else {
        selectedNote = notesCache[0];
      }
      
      toast('Note saved!', 'success');
    }

    editingNoteId = null;
    await loadNotes();
  };
}

function buildSolarPlanet(planet) {
  const px = 400 + planet.x;
  const py = 300 + planet.y;
  const abbrev = planet.book.length > 10 ? planet.book.replace(/^(1|2|3)\s?/, '$1 ').replace(/[a-z]/g, '').substring(0, 4) : planet.book.substring(0, 6);
  
  let html = `<div class="planet-group" data-book="${escapeHtml(planet.book)}" data-count="${planet.notes.length}" data-orbit="${planet.orbitRadius}" data-base-angle="${planet.baseAngle}" style="left:${px}px;top:${py}px;">
    <div class="planet ${planet.testament}" style="width:${planet.size}px;height:${planet.size}px;">
      ${abbrev}
      <div class="planet-count">${planet.notes.length}</div>
    </div>
    <div class="planet-name">${escapeHtml(planet.book)}</div>
    <div class="moons-container" id="moons-${planet.book.replace(/\s/g, '')}">`;
  
  // Moons
  const moonCount = planet.notes.length;
  const moonRadius = Math.max(30, Math.min(55, 30 + planet.size * 0.4));
  const moonAngleStep = (2 * Math.PI) / moonCount;
  
  for (let mi = 0; mi < moonCount; mi++) {
    const note = planet.notes[mi];
    const angle = mi * moonAngleStep - Math.PI / 2;
    const mx = moonRadius * Math.cos(angle);
    const my = moonRadius * Math.sin(angle);
    const category = getNoteCategory(note);
    const moonSize = Math.max(16, Math.min(26, 16 + (note.title ? note.title.length * 0.15 : 0)));
    const shortTitle = (note.title || 'Note').length > 8 ? (note.title || 'Note').substring(0, 7) + '\u2026' : (note.title || 'Note');
    
    const halfSize = moonSize / 2;
    html += `<div class="moon ${SOLAR_NOTE_COLORS[category].className}" 
      style="left:calc(50% + ${mx}px - ${halfSize}px);top:calc(50% + ${my}px - ${halfSize}px);width:${moonSize}px;height:${moonSize}px;font-size:${moonSize > 20 ? 7 : 6}px;"
      data-note-id="${note.id}"
      data-note-title="${escapeHtml(note.title || 'Untitled')}"
      title="${escapeHtml(note.title || 'Untitled')}">${shortTitle}</div>`;
  }
  
  html += '</div></div>';
  return html;
}

function togglePlanet(el) {
  const moonsContainer = el.querySelector('.moons-container');
  const planet = el.querySelector('.planet');
  const isVisible = moonsContainer.classList.contains('visible');
  
  // Close all other planets first
  document.querySelectorAll('.moons-container.visible').forEach(mc => {
    if (mc !== moonsContainer) {
      mc.classList.remove('visible');
      mc.closest('.planet-group').querySelector('.planet').classList.remove('expanded');
    }
  });
  
  if (isVisible) {
    moonsContainer.classList.remove('visible');
    planet.classList.remove('expanded');
  } else {
    moonsContainer.classList.add('visible');
    planet.classList.add('expanded');
    
    // Animate moons in with staggered delay
    const moons = moonsContainer.querySelectorAll('.moon');
    moons.forEach((moon, i) => {
      moon.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      moon.style.transform = moon.style.transform.replace('scale(', 'scale_');
      // Trigger reflow
      void moon.offsetWidth;
      moon.style.opacity = '1';
    });
  }
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const tooltipTimeout = { id: null };

function showTooltip(el, text) {
  hideTooltip();
  tooltipTimeout.id = setTimeout(() => {
    const tooltip = document.getElementById('solarTooltip');
    if (!tooltip) return;
    const rect = el.getBoundingClientRect();
    const container = document.getElementById('solarSystemContainer').getBoundingClientRect();
    let left = rect.left - container.left + rect.width / 2;
    let top = rect.top - container.top - 30;
    if (top < 10) top = rect.bottom - container.top + 10;
    tooltip.textContent = text;
    tooltip.style.left = Math.max(10, Math.min(left - 100, container.width - 210)) + 'px';
    tooltip.style.top = top + 'px';
    tooltip.classList.add('visible');
  }, 300);
}

function hideTooltip() {
  clearTimeout(tooltipTimeout.id);
  const tooltip = document.getElementById('solarTooltip');
  if (tooltip) tooltip.classList.remove('visible');
}

function generateStarfield(count = 50) {
  const container = document.getElementById('solarStarfield');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 4 + 2;
    const delay = Math.random() * 3;
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px;--twinkle-duration:${duration}s;animation-delay:${delay}s;`;
    container.appendChild(star);
  }
}

async function editNote(id) {
  const note = notesCache.find(n => n.id === id);
  if (note) {
    document.getElementById('solarSystemContainer').style.display = 'none';
    document.getElementById('noteComposer').style.display = 'block';
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteVerseRef').value = note.book ? `${note.book} ${note.chapter || ''}:${note.verse || ''}` : '';
  }
}

async function deleteNote(id) {
  if (await showConfirm('Delete this note?')) {
    await window.api.deleteNote(id);
    await loadNotes();
    toast('Note deleted', 'info');
  }
}

// Solar system zoom controls
function setupSolarControls() {
  const zoomIn = document.getElementById('solarZoomIn');
  const zoomOut = document.getElementById('solarZoomOut');
  const reset = document.getElementById('solarReset');
  const rotateToggle = document.getElementById('solarRotateToggle');
  
  if (!zoomIn) return;
  
  zoomIn.onclick = () => {
    solarZoom = Math.min(2, solarZoom + 0.2);
    applySolarZoom();
  };
  
  zoomOut.onclick = () => {
    solarZoom = Math.max(0.4, solarZoom - 0.2);
    applySolarZoom();
  };
  
  reset.onclick = () => {
    solarZoom = 1;
    solarAngleOffset = 0;
    solarTiltX = 0;
    solarTiltY = 0;
    applySolarZoom();
    updateSolarPositions();
    // Close all expanded planets
    document.querySelectorAll('.moons-container.visible').forEach(mc => {
      mc.classList.remove('visible');
      mc.closest('.planet-group').querySelector('.planet').classList.remove('expanded');
    });
  };
  
  rotateToggle.onclick = () => {
    solarRotation = !solarRotation;
    rotateToggle.style.opacity = solarRotation ? '1' : '0.4';
  };
  
  // Mouse wheel zoom
  const container = document.getElementById('solarSystemContainer');
  container.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) solarZoom = Math.min(2, solarZoom + 0.1);
      else solarZoom = Math.max(0.4, solarZoom - 0.1);
      applySolarZoom();
    }
  }, { passive: false });
}

function applySolarZoom() {
  const system = document.getElementById('solarSystem');
  if (system) {
    system.style.transform = `perspective(1200px) rotateX(${solarTiltX}deg) rotateY(${solarTiltY}deg) scale(${solarZoom})`;
  }
}

async function setupQuiz() {
  const today = new Date().toISOString().split('T')[0];
  const existing = await window.api.getTodayQuiz(today);

  if (existing) {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizAlreadyDone').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('previousResult').innerHTML = `<div class="quiz-result" style="margin-top:20px;"><div class="result-score"><span>${existing.score}/${existing.total}</span><span class="temp-${existing.spiritual_temp.toLowerCase().replace(' ', '-')}">${existing.spiritual_temp}</span></div></div>`;
    return;
  }

  document.getElementById('quizContent').style.display = 'block';
  document.getElementById('quizAlreadyDone').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';

  quizState = { current: 0, score: 0, answers: [] };
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = QUIZ_QUESTIONS[quizState.current];
  const progress = ((quizState.current + 1) / QUIZ_QUESTIONS.length) * 100;
  document.getElementById('quizProgressFill').style.width = `${progress}%`;
  document.getElementById('quizProgressText').textContent = `Question ${quizState.current + 1} of ${QUIZ_QUESTIONS.length}`;
  document.getElementById('quizQuestion').textContent = q.question;

  const answersContainer = document.getElementById('quizAnswers');
  answersContainer.innerHTML = q.answers.map((a, i) => `<button class="quiz-answer" data-action="quiz-answer" data-index="${i}" data-points="${a.points}">${a.text}</button>`).join('');
}

async function selectAnswer(index, points) {
  quizState.score += points;
  quizState.answers.push({ question: QUIZ_QUESTIONS[quizState.current].question, answer: index, points });

  document.querySelectorAll('#quizAnswers .quiz-answer').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });

  setTimeout(async () => {
    quizState.current++;
    if (quizState.current < QUIZ_QUESTIONS.length) {
      showQuizQuestion();
    } else {
      await showQuizResults();
    }
  }, 500);
}

async function showQuizResults() {
  const total = QUIZ_QUESTIONS.length * 10;
  const percentage = (quizState.score / total) * 100;
  let temp, icon, title;

  if (percentage >= 85) { temp = 'On Fire'; icon = '\uD83D\uDD25'; title = 'You are ON FIRE for Christ!'; }
  else if (percentage >= 65) { temp = 'Hot'; icon = '\u2600\uFE0F'; title = 'You are burning HOT!'; }
  else if (percentage >= 45) { temp = 'Warm'; icon = '\u2600\uFE0F'; title = 'You are Warm - keep feeding the fire!'; }
  else if (percentage >= 25) { temp = 'Cooling'; icon = '\uD83C\uDF27\uFE0F'; title = 'Warning: You are Cooling down!'; }
  else { temp = 'Cold'; icon = '\u2744\uFE0F'; title = 'DANGER: You are growing COLD!'; }

  const encouragements = ENCOURAGEMENTS[temp];
  const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  document.getElementById('quizContent').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';
  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = `${quizState.score}/${total}`;
  document.getElementById('resultTemp').textContent = temp;
  document.getElementById('resultTemp').className = `temp-${temp.toLowerCase().replace(' ', '-')}`;
  document.getElementById('resultDesc').textContent = `You scored ${Math.round(percentage)}% on today's spiritual assessment.`;
  document.getElementById('resultEncouragement').textContent = encouragement;

  const topic = temp === 'Cold' || temp === 'Cooling' ? 'watchfulness' : 'faith';
  const verses = await window.api.getKeyVersesForTopic(topic);
  document.getElementById('resultVerses').innerHTML = verses.map(v => `<div class="verse-item" data-action="related-verse" data-book="${v.book}" data-chapter="${v.chapter}"><div class="verse-ref">${v.book} ${v.chapter}:${v.verse}</div><div class="verse-text">${v.text}</div></div>`).join('');

  await window.api.saveQuizResult(new Date().toISOString().split('T')[0], quizState.score, total, temp, quizState.answers);
  await updateSpiritualTemp();
}

async function loadSermons() {
  const searchTerm = (document.getElementById('sermonSearchInput')?.value || '').toLowerCase().trim();
  const filtered = SERMONS_DATA.filter(s => {
    const matchCat = currentSermonFilter === 'all' || s.category === currentSermonFilter;
    const matchSearch = !searchTerm ||
      s.title.toLowerCase().includes(searchTerm) ||
      s.desc.toLowerCase().includes(searchTerm) ||
      s.scripture.toLowerCase().includes(searchTerm) ||
      s.code.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });

  const container = document.getElementById('sermonList');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="sermon-index-empty">No sermons found</div>`;
    return;
  }

  container.innerHTML = filtered.map((s, i) => `
    <div class="sermon-index-item${currentSermon && currentSermon.code === s.code ? ' active' : ''}"
         data-action="play-sermon" data-code="${s.code}" role="button" tabindex="0">
      <div class="sermon-index-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="sermon-index-info">
        <div class="sermon-index-title">${s.title}</div>
        <div class="sermon-index-sub">
          <span class="sermon-index-year">${s.date}</span>
          <span class="sermon-index-cat">${s.category.replace(/-/g, ' ')}</span>
        </div>
      </div>
      <svg class="sermon-index-arrow" viewBox="0 0 24 24" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `).join('');

  // Category filter buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSermonFilter = btn.dataset.cat;
      loadSermons();
    };
  });

  // Search input
  const searchInput = document.getElementById('sermonSearchInput');
  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener('input', debounce(() => loadSermons(), 300));
  }

  // Fullscreen toggle — set up once
  const fsBtn = document.getElementById('sermonFullscreenBtn');
  if (fsBtn && !fsBtn._bound) {
    fsBtn._bound = true;
    let sermonFS = false;
    const app = document.getElementById('app');

    const enterFS = () => {
      sermonFS = true;
      app.classList.add('sermon-fullscreen');
      fsBtn.classList.add('active');
      fsBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg> Exit Full`;
    };
    const exitFS = () => {
      sermonFS = false;
      app.classList.remove('sermon-fullscreen');
      fsBtn.classList.remove('active');
      fsBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> Full Screen`;
    };

    fsBtn.onclick = () => sermonFS ? exitFS() : enterFS();

    if (!document._sermonFsKeyBound) {
      document._sermonFsKeyBound = true;
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sermonFS) exitFS();
        if (e.key === 'f' || e.key === 'F') {
          const onSermons = document.getElementById('page-sermons')?.classList.contains('active');
          if (onSermons && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
            sermonFS ? exitFS() : enterFS();
          }
        }
      });
    }
  }
}

/**
 * Parse raw transcript text into verse-like segments.
 * Branham transcripts have L-NNN paragraph markers. Within each paragraph,
 * we split on sentence boundaries so each sentence becomes its own "verse row"
 * — identical to how Bible chapters show one verse per row.
 */
function parseSermonIntoVerses(rawText) {
  const verses = [];
  // Split by paragraph markers (L-NNN or blank lines)
  const rawParas = rawText.split(/\n\n+/);

  rawParas.forEach(para => {
    const trimmed = para.trim();
    if (!trimmed) return;

    // Extract the L-NNN label if present
    const labelMatch = trimmed.match(/^(L-\d+)\s*/);
    const paraLabel = labelMatch ? labelMatch[1] : null;
    const paraText = labelMatch ? trimmed.slice(labelMatch[0].length).trim() : trimmed;

    if (!paraText) return;

    // Split paragraph text into sentences
    // Split on: period/exclamation/question mark followed by space+capital letter,
    // or on semicolons that end longer clauses (optional), preserving the punctuation
    const sentenceRe = /(?<=[.!?])\s+(?=[A-Z"'])|(?<=;)\s+(?=[A-Z"'])/g;
    const sentences = paraText.split(sentenceRe).map(s => s.trim()).filter(Boolean);

    sentences.forEach((sentence, si) => {
      // Label: if it's the first sentence in a labeled paragraph, use L-NNN, else blank for same-para continuations
      const label = si === 0 && paraLabel ? paraLabel : null;
      verses.push({ label, text: sentence, isFirstInPara: si === 0 });
    });
  });

  return verses;
}

function playSermon(code) {
  const sermon = SERMONS_DATA.find(s => s.code === code);
  if (!sermon) { toast('Sermon not found.', 'error'); return; }
  currentSermon = sermon;
  window.api.logActivity('sermon_play', code + ' - ' + sermon.title);

  // Update active state in list
  document.querySelectorAll('.sermon-index-item').forEach(el => {
    el.classList.toggle('active', el.dataset.code === code);
  });

  // Show reader panel, hide empty state
  document.getElementById('sermonEmptyState').style.display = 'none';
  const readerContent = document.getElementById('sermonReaderContent');
  readerContent.style.display = 'block';

  // Fill header info
  document.getElementById('readerTitle').textContent = sermon.title;
  document.getElementById('readerYear').textContent = sermon.date;
  document.getElementById('readerCode').textContent = sermon.code;
  document.getElementById('readerScripture').textContent = '📖 ' + sermon.scripture;
  document.getElementById('readerDesc').textContent = sermon.desc;

  // Scroll reading panel to top
  const readingPanel = document.getElementById('sermonReadingPanel');
  if (readingPanel) readingPanel.scrollTop = 0;

  // Setup Open button
  const openBtn = document.getElementById('openMsgBtn');
  openBtn.textContent = 'Loading...';
  openBtn.disabled = true;
  if (code) {
    window.api.lookupChurchagesUrl(code).then(cUrl => {
      const url = cUrl || sermon.more;
      openBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Read Online`;
      openBtn.disabled = false;
      openBtn.onclick = () => window.api.openExternal(url);
    }).catch(() => {
      openBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Read Online`;
      openBtn.disabled = false;
      openBtn.onclick = () => window.api.openExternal(sermon.more);
    });
  } else {
    openBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Read Online`;
    openBtn.disabled = false;
    openBtn.onclick = () => window.api.openExternal(sermon.more || 'https://churchages.net');
  }

  // TTS setup
  window.speechSynthesis.cancel();
  let tts = null;
  const ttsBtn = document.getElementById('ttsBtn');
  ttsBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Read Aloud`;
  const stopTts = () => {
    window.speechSynthesis.cancel();
    tts = null;
    ttsBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Read Aloud`;
  };
  ttsBtn.onclick = () => {
    if (tts) { stopTts(); return; }
    const text = document.getElementById('transcriptText')?.innerText || '';
    if (!text || text.length < 50) { toast('No transcript loaded to read.', 'warning'); return; }
    tts = new SpeechSynthesisUtterance(text.replace(/L-\d+|¶\s*\d+/g, '').substring(0, 5000));
    tts.rate = 0.9; tts.pitch = 1; tts.volume = 1;
    tts.onend = () => stopTts();
    window.speechSynthesis.speak(tts);
    ttsBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Stop`;
  };

  // Save to Notes
  const tt = document.getElementById('transcriptText');
  document.getElementById('saveTranscriptBtn').onclick = () => {
    const text = tt?.innerText || tt?.textContent || '';
    if (text && text.length > 100 && !text.includes('not available') && !text.includes('Failed to load') && !text.includes('Could not load')) {
      window.api.saveNote(sermon.title + ' Transcript', text, null, null, null);
      toast('Transcript saved to Notes!', 'success');
    } else {
      toast('No transcript loaded yet to save.', 'warning');
    }
  };

  // Load transcript — render Bible-verse style
  const loading = document.getElementById('transcriptLoading');
  tt.innerHTML = '';
  if (loading) loading.style.display = 'flex';

  if (code) {
    Promise.race([
      window.api.fetchTranscript(code),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 20000))
    ]).then(res => {
      if (loading) loading.style.display = 'none';
      if (res.text && res.text.length > 100) {
        // Parse into verse-like sentence segments
        const verses = parseSermonIntoVerses(res.text);
        let globalVerseNum = 0;

        tt.innerHTML = verses.map(v => {
          globalVerseNum++;
          const numDisplay = v.label || `¶${globalVerseNum}`;
          // Add a paragraph break line above the first sentence of each new L-NNN paragraph
          const paraBreak = (v.isFirstInPara && v.label) ? `<div class="sermon-para-divider"></div>` : '';
          return `${paraBreak}<div class="sermon-verse-row" id="sv-${globalVerseNum}" tabindex="0">
              <span class="sermon-verse-num" title="${v.label ? v.label + ' – verse ' + globalVerseNum : 'Verse ' + globalVerseNum}">${numDisplay}</span>
              <div class="sermon-verse-content">${escapeHtml(v.text)}</div>
            </div>`;
        }).join('');

        // Paragraph hover/select like Bible verse clicking
        tt.addEventListener('click', e => {
          const row = e.target.closest('.sermon-verse-row');
          if (row) row.classList.toggle('sermon-verse-selected');
        });
        tt.addEventListener('keydown', e => {
          const row = e.target.closest('.sermon-verse-row');
          if (row && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            row.classList.toggle('sermon-verse-selected');
          }
        });

      } else {
        const errMsg = res.error || 'Transcript not available for this message.';
        tt.innerHTML = `<div class="sermon-transcript-error">
          <svg viewBox="0 0 24 24" width="32" height="32" opacity="0.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>${errMsg}</p>
          <a href="#" onclick="window.api.openExternal('${sermon.more}'); return false;" class="sermon-external-link">Read on churchages.net →</a>
        </div>`;
      }
    }).catch(() => {
      if (loading) loading.style.display = 'none';
      tt.innerHTML = `<div class="sermon-transcript-error">
        <svg viewBox="0 0 24 24" width="32" height="32" opacity="0.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p>Could not load transcript. Check your connection.</p>
        <a href="#" onclick="window.api.openExternal('${sermon.more}'); return false;" class="sermon-external-link">Read on churchages.net →</a>
      </div>`;
    });
  }
}

/* ---- SMART LESSONS ---- */

const SMART_LESSONS = {
  grace: {
    titles: ['Unsearchable Riches of Grace', 'Saved by Grace Through Faith', 'Grace That Teaches Us', 'The Throne of Grace', 'More Than Enough Grace'],
    refs: [{ book: 'Ephesians', chapter: 2, start: 4, end: 9 }, { book: 'Romans', chapter: 5, start: 1, end: 2 }],
    contents: [
      'Grace is not a license to sin — it is the power of God that enables you to live holy. Many misunderstand grace as permission to continue in sin, but the Bible teaches that grace is a teacher. It instructs us to deny ungodliness and worldly lusts, and to live soberly, righteously, and godly in this present world. Grace came through Jesus Christ, and it is sufficient for every weakness, every failure, and every need. When you fall, grace lifts you up. When you are weak, grace makes you strong. The same grace that saved you is the grace that keeps you. Do not treat it cheaply; let it transform your life from glory to glory.',
      'Grace is God\'s unmerited favor toward sinners. While we were yet sinners, Christ died for us. This is the foundation of the gospel — not what we have done for God, but what God has done for us. Grace does not ignore sin; it overcomes it. The law showed us our inability; grace gives us God\'s ability. It is not a covering for rebellion but the power to live in victory. When you truly understand grace, it produces gratitude, humility, and a deep love for God. Receive grace not as a pass to sin, but as power to live right.',
      'From the throne of God flows a river of grace. In the Old Testament, the mercy seat was hidden in the holy of holies. But when Jesus died, the veil was torn, and grace poured out. Now we can come boldly to the throne of grace, not because we are worthy, but because He is worthy. Grace is the atmosphere of heaven. It is the smile of God upon His children. Live each day conscious of His grace upon your life. It is sufficient for every trial and every temptation.'
    ]
  },
  faith: {
    titles: ['Living by Faith in Every Season', 'The Substance of Faith', 'Faith That Moves Mountains', 'The Shield of Faith', 'From Faith to Faith'],
    refs: [{ book: 'Hebrews', chapter: 11, start: 1, end: 6 }, { book: 'Romans', chapter: 10, start: 9, end: 17 }],
    contents: [
      'Faith is the substance of things hoped for, the evidence of things not seen. In your walk with God, faith is not optional — it is essential. Every great move of God begins with someone who believed God more than they believed their circumstances. As you read His Word, let it build faith in your heart. God is the same yesterday, today, and forever, and He is faithful to perform His Word in your life.',
      'Faith comes by hearing, and hearing by the Word of God. The more you immerse yourself in Scripture, the stronger your faith becomes. Do not look at your circumstances — look at the promises of God. Abraham believed God against all hope, and it was counted to him as righteousness. When doubt comes, stand on the Word. Faith is not the absence of fear but the decision to trust God despite the fear.',
      'Without faith it is impossible to please God. Faith is the currency of heaven. When you pray, believe that you have received what you ask for. Faith sees the invisible, believes the incredible, and receives the impossible. Your faith is tested so that it may produce patience and maturity. Count it all joy when trials come, knowing that the testing of your faith produces endurance.'
    ]
  },
  prayer: {
    titles: ['The Power of Persistent Prayer', 'Pray Without Ceasing', 'The Secret Place', 'Effectual Fervent Prayer', 'Prayer That Moves God'],
    refs: [{ book: 'Luke', chapter: 18, start: 1, end: 8 }, { book: 'James', chapter: 5, start: 16, end: 18 }],
    contents: [
      'Prayer is the lifeline of the believer. Through prayer, we commune with the Father, align our will with His, and release heaven\'s power into our situations. Jesus taught us to pray and never give up. The secret to powerful prayer is not eloquence but faith. Come before God with boldness, knowing He hears you and answers according to His will.',
      'The effectual fervent prayer of a righteous man avails much. Elijah was a man subject to like passions as we are, and he prayed earnestly. Do not underestimate the power of one person praying in the will of God. Prayer changes things because prayer changes us. It aligns our hearts with heaven and invites God\'s power into our circumstances. Pray without ceasing, and let prayer become not just an activity but a lifestyle.',
      'Enter into your secret place, shut the door, and pray to your Father who sees in secret. The most powerful prayers are the ones prayed in private. Jesus often withdrew to lonely places and prayed. If the Son of God needed prayer, how much more do we? Build a private life of prayer that no one sees but everyone notices. The secret place is where battles are won before they are fought.'
    ]
  },
  watchfulness: {
    titles: ['Staying Awake for His Return', 'Watch and Pray', 'The Midnight Cry', 'Bridegroom Is Coming', 'Keep Your Lamp Burning'],
    refs: [{ book: 'Revelation', chapter: 3, start: 14, end: 22 }, { book: 'Matthew', chapter: 25, start: 1, end: 13 }],
    contents: [
      'To the Laodicean church age, Christ stands outside knocking. Lukewarmness is the greatest danger of our time. Check your spiritual temperature: are you hot, cold, or lukewarm? The Bridegroom is coming. Stay awake, stay ready, and keep your lamp burning.',
      'Watch therefore, for you know neither the day nor the hour. The wise virgins took oil in their vessels with their lamps. The oil represents the Holy Spirit in your life. Do not be caught unprepared. The days are evil, and the spirit of slumber has fallen upon many. Shake off the spirit of sleep and keep your eyes fixed on the eastern sky. Redemption draws near.',
      'Be sober, be vigilant; your adversary the devil walks about like a roaring lion. Watchfulness is not paranoia — it is spiritual awareness. Know the times and seasons. The signs of His coming are all around you: wars, earthquakes, pestilences, and the love of many growing cold. But blessed are those servants whom the Lord, when He comes, shall find watching.'
    ]
  },
  revelation: {
    titles: ['Understanding Divine Revelation', 'The Unveiling of Jesus Christ', 'Mysteries of the Kingdom', 'The Open Book', 'Eyes to See'],
    refs: [{ book: 'Revelation', chapter: 1, start: 1, end: 3 }, { book: 'Daniel', chapter: 12, start: 4, end: 10 }],
    contents: [
      'The book of Revelation is not a sealed book — it is an open revelation of Jesus Christ. In these last days, God is revealing mysteries that have been hidden since the foundation of the world. Ask the Holy Spirit to open your understanding as you study. The time is short, and the message is clear: Jesus is coming soon.',
      'Blessed is he who reads and those who hear the words of this prophecy. Revelation means an unveiling — God pulling back the curtain to show you what is to come. But it also reveals Jesus Christ in all His glory. Study prophecy not to be a sensationalist, but to know Christ more deeply. Every prophecy points to Him. The spirit of prophecy is the testimony of Jesus.',
      'In the days of the voice of the seventh angel, the mystery of God will be finished. We are living in the time when sealed books are being opened. Daniel was told to seal up the book until the time of the end, but now knowledge is increasing. Ask God for wisdom and revelation in the knowledge of Him. The eyes of your understanding need to be enlightened.'
    ]
  },
  'holy spirit': {
    titles: ['Walking in the Spirit Daily', 'The Comforter Has Come', 'Filled with the Spirit', 'Led by the Spirit', 'The Power of Pentecost'],
    refs: [{ book: 'Acts', chapter: 2, start: 1, end: 4 }, { book: 'Galatians', chapter: 5, start: 16, end: 25 }],
    contents: [
      'The Holy Spirit is not a force — He is a Person. He was sent to be your Comforter, Teacher, and Guide. He leads you into all truth, convicts of sin, and empowers you for service. Being filled with the Spirit is not a one-time event but a daily experience. Yield to Him, and He will transform your life.',
      'Walk in the Spirit and you shall not fulfill the lust of the flesh. The battle between flesh and spirit is real, but the Holy Spirit gives you the victory. He produces in you love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, and temperance. These are not works of the flesh but fruit of the Spirit. The more you yield, the more fruit you bear.',
      'You shall receive power after the Holy Spirit has come upon you. The early church turned the world upside down because they were Spirit-filled. The same power that raised Christ from the dead dwells in you. Do not grieve the Holy Spirit through disobedience. Do not quench Him through neglect. Invite His presence in every moment of your day.'
    ]
  },
  'end times': {
    titles: ['Signs of the Times', 'The Last Days', 'The Coming King', 'Prepare the Way', 'Behold He Comes'],
    refs: [{ book: 'Matthew', chapter: 24, start: 3, end: 8 }, { book: '2 Timothy', chapter: 3, start: 1, end: 5 }],
    contents: [
      'We are living in the days that prophets and apostles longed to see. Jesus gave clear signs of His coming: wars, earthquakes, pestilences, and the love of many growing cold. But He also said to lift up your heads, for your redemption draws near. Watch world events through the lens of Scripture and stay ready.',
      'In the last days perilous times shall come. Men will be lovers of their own selves, covetous, boasters, proud, blasphemers, disobedient to parents, unthankful, unholy. Look around and see these signs being fulfilled daily. But you are not of the darkness that the day should overtake you as a thief. You are children of light. Walk as children of light.',
      'The day of the Lord will come as a thief in the night. But we are not in darkness that that day should overtake us. Watch world events through the lens of Scripture. Understand the times and know what Israel should do. The fig tree is putting forth its leaves. Summer is near. Be ready, for the Son of Man is coming at an hour you do not expect.'
    ]
  },
  spiritual: {
    titles: ['Set Apart for God', 'The Consecrated Life', 'Holiness Unto the Lord', 'A Royal Priesthood', 'Living Sacrifice'],
    refs: [{ book: 'Colossians', chapter: 3, start: 1, end: 4 }, { book: 'Romans', chapter: 12, start: 1, end: 2 }],
    contents: [
      'You are not of this world. True consecration means being set apart for God\'s purposes. In a world of compromise, God calls His people to be different. Set your mind on things above, not on earthly things. Your life is hidden with Christ in God.',
      'Present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service. Do not be conformed to this world, but be transformed by the renewing of your mind. Separation from the world is not about isolation but about devotion. You are in the world but not of it. Let your light shine before men that they may see your good works and glorify your Father.',
      'You are a chosen generation, a royal priesthood, a holy nation, His own special people. He called you out of darkness into His marvelous light. Holiness is not a list of rules — it is a relationship with a holy God. As He who called you is holy, be holy in all your conduct. The world needs to see a people who are different because they have been with Jesus.'
    ]
  },
  salvation: {
    titles: ['The Foundation of Salvation', 'Born Again', 'The Gift of God', 'Eternal Life in Christ', 'The Great Exchange'],
    refs: [{ book: 'Romans', chapter: 10, start: 9, end: 13 }, { book: 'Ephesians', chapter: 2, start: 1, end: 5 }],
    contents: [
      'Salvation is not by works but by grace through faith. It is the gift of God. But true salvation produces a life of obedience and love. If you confess with your mouth the Lord Jesus and believe in your heart that God raised Him from the dead, you shall be saved. This is the foundation of everything.',
      'You were dead in trespasses and sins, but God, who is rich in mercy, made you alive together with Christ. Salvation is more than just forgiveness — it is a complete transformation. Old things pass away and all things become new. You are a new creation in Christ Jesus. Rejoice in your salvation and let it produce a life of gratitude and obedience.',
      'He who has the Son has life; he who does not have the Son does not have life. Salvation is not a religion — it is a relationship with the living God through His Son Jesus Christ. It is the most precious gift ever given. Do not take it for granted. Work out your own salvation with fear and trembling, for it is God who works in you both to will and to do of His good pleasure.'
    ]
  },
  love: {
    titles: ['The Greatest of These Is Love', 'God Is Love', 'Love One Another', 'Agape Love', 'Love That Never Fails'],
    refs: [{ book: '1 Corinthians', chapter: 13, start: 1, end: 8 }, { book: '1 John', chapter: 4, start: 7, end: 12 }],
    contents: [
      'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. Love is the greatest evidence of being a disciple of Christ. Without love, all spiritual gifts are meaningless. Pray that God would pour His love into your heart by the Holy Spirit, and let that love flow through you to a hurting world.',
      'Beloved, let us love one another, for love is of God. Everyone who loves is born of God and knows God. He who does not love does not know God, for God is love. The world will know you are His disciples by the love you have for one another. Let love be without hypocrisy. Abhor what is evil and cling to what is good.',
      'Greater love has no one than this, than to lay down one\'s life for his friends. Jesus demonstrated the ultimate love on the cross. While we were still sinners, He died for us. This is the model of true love — sacrificial, unconditional, and eternal. Let this mind be in you which was also in Christ Jesus.'
    ]
  },
  hope: {
    titles: ['The Anchor of Hope', 'Living in Expectation', 'Hope Does Not Disappoint', 'The Blessed Hope', 'Hope That Anchors the Soul'],
    refs: [{ book: 'Romans', chapter: 15, start: 4, end: 13 }, { book: 'Hebrews', chapter: 6, start: 13, end: 20 }],
    contents: [
      'Hope is the anchor of the soul, both sure and steadfast. In a world of uncertainty, our hope in Christ is unshakable. It is not wishful thinking but confident expectation. Because He is faithful who promised, our hope is secure. Fix your hope completely on the grace that is to be brought to you at the revelation of Jesus Christ.',
      'Hope does not disappoint, because the love of God has been poured out in our hearts. Trials produce patience, patience produces character, and character produces hope. Even when circumstances look bleak, hope rises. The God of hope fills you with all joy and peace in believing, that you may abound in hope by the power of the Holy Spirit.',
      'We have this hope as an anchor of the soul. Just as an anchor holds a ship steady in a storm, hope holds your soul steady in the storms of life. Jesus has gone before you into the veil, a forerunner on your behalf. Your hope is not in temporary things but in eternal realities. Set your hope fully on the return of Christ.'
    ]
  },
  'overcoming': {
    titles: ['More Than Conquerors', 'Overcoming the World', 'Victory in Christ', 'The Overcoming Life', 'Strong in the Lord'],
    refs: [{ book: 'Romans', chapter: 8, start: 31, end: 39 }, { book: '1 John', chapter: 5, start: 4, end: 5 }],
    contents: [
      'In all these things we are more than conquerors through Him who loved us. Nothing can separate you from the love of God. Tribulation, distress, persecution, famine, nakedness, peril, or sword — in all these things you are more than a conqueror. Not just a conqueror, but more. The victory is already won. Walk in it.',
      'Whatever is born of God overcomes the world. This is the victory that has overcome the world — our faith. The battle is the Lord\'s. You do not fight for victory; you fight from victory. Christ has already won. Stand therefore, having done all, stand. Put on the whole armor of God and withstand in the evil day.',
      'Be strong in the Lord and in the power of His might. Your strength is not in yourself but in the Lord. When you are weak, then you are strong. His grace is sufficient. His power is made perfect in weakness. Therefore take up the whole armor of God, that you may be able to withstand in the evil day, and having done all, to stand.'
    ]
  },
  'wisdom': {
    titles: ['The Wisdom from Above', 'Knowledge of the Holy', 'Walking in Wisdom', 'The Fear of the Lord', 'Understanding the Times'],
    refs: [{ book: 'Proverbs', chapter: 2, start: 1, end: 6 }, { book: 'James', chapter: 3, start: 13, end: 18 }],
    contents: [
      'The fear of the Lord is the beginning of wisdom. True wisdom does not come from books or experience alone — it comes from God. If any of you lacks wisdom, let him ask of God, who gives generously to all without reproach. Wisdom from above is first pure, then peaceable, gentle, willing to yield, full of mercy and good fruits.',
      'Get wisdom, get understanding. Do not forget nor turn away from the words of God\'s mouth. Wisdom is the principal thing; therefore get wisdom. In all your getting, get understanding. Wisdom will exalt you and bring you honor when you embrace her. The wise inherit glory, but shame shall be the promotion of fools.',
      'The wisdom that is from above is pure, peaceable, gentle, and easy to be entreated. It is full of mercy and good fruits, without partiality and without hypocrisy. This is not the wisdom of the world but the wisdom of God. Let the word of Christ dwell in you richly in all wisdom, teaching and admonishing one another.'
    ]
  }
};

const FOCUS_MAP = [
  { name: 'grace', quizMin: 0, quizMax: 0.25, books: [] },
  { name: 'salvation', quizMin: 0.25, quizMax: 0.45, books: [] },
  { name: 'watchfulness', quizMin: 0, quizMax: 0.45, books: [] },
  { name: 'prayer', quizMin: 0.45, quizMax: 0.65, books: [] },
  { name: 'faith', quizMin: 0.65, quizMax: 0.85, books: [] },
  { name: 'love', quizMin: 0.65, quizMax: 0.85, books: [] },
  { name: 'hope', quizMin: 0.7, quizMax: 1, books: [] },
  { name: 'revelation', quizMin: 0, quizMax: 1, books: ['Revelation', 'Daniel'] },
  { name: 'holy spirit', quizMin: 0, quizMax: 1, books: ['Acts', 'Romans'] },
  { name: 'end times', quizMin: 0.5, quizMax: 1, books: ['Revelation', 'Daniel', 'Matthew', 'Mark'] },
  { name: 'spiritual', quizMin: 0.65, quizMax: 1, books: [] },
  { name: 'overcoming', quizMin: 0.4, quizMax: 0.7, books: [] },
  { name: 'wisdom', quizMin: 0.5, quizMax: 1, books: ['Proverbs', 'Ecclesiastes'] },
];

async function loadLessons() {
  document.getElementById('lessonView').style.display = 'none';
  const container = document.getElementById('lessonsList');
  const emptyMsg = document.getElementById('lessonsEmpty');

  const saved = await window.api.getLessons();

  const lastGen = await window.api.getProfile('last_lesson_date');
  const today = new Date().toISOString().split('T')[0];
  if (lastGen !== today) {
    await window.api.setProfile('last_lesson_date', today);
    generateLesson(true);
    return;
  }
  if (saved.length === 0) {
    container.innerHTML = '';
    container.style.display = 'none';
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = saved.map(l => {
      const verses = typeof l.verses === 'string' ? JSON.parse(l.verses) : (l.verses || []);
      const src = l.source || 'smart';
      return `<div class="lesson-card" data-lesson-id="${l.id}">
        <span class="card-source">${src === 'smart' ? 'Smart Lesson' : src === 'sermon' ? 'From Sermon' : 'Lesson'}</span>
        <div class="card-title">${escapeHtml(l.title)}</div>
        <div class="card-preview">${escapeHtml((l.content || '').substring(0, 150))}${(l.content || '').length > 150 ? '…' : ''}</div>
        <div class="card-footer">
          <span class="card-verses">${verses.length} verse${verses.length !== 1 ? 's' : ''}</span>
          <span class="card-date">${l.created_at ? new Date(l.created_at).toLocaleDateString() : ''}</span>
        </div>
      </div>`;
    }).join('');

    container.querySelectorAll('.lesson-card').forEach(el => {
      el.addEventListener('click', () => {
        const id = parseInt(el.dataset.lessonId);
        if (id) viewLesson(id);
      });
    });
  }

  const genBtn = document.getElementById('generateLesson');
  genBtn.onclick = generateLesson;

  document.getElementById('closeLesson').onclick = () => {
    document.getElementById('lessonView').style.display = 'none';
    container.style.display = saved.length > 0 ? 'grid' : 'none';
    emptyMsg.style.display = saved.length > 0 ? 'none' : 'block';
  };

  document.getElementById('completeLessonBtn').onclick = async () => {
    const id = parseInt(document.getElementById('lessonView').dataset.lessonId);
    if (id) {
      await window.api.completeLesson(id);
      await window.api.deleteLesson(id);
      document.getElementById('lessonView').style.display = 'none';
      await generateLesson();
      toast('Lesson completed! New one growing…', 'success');
    }
  };
}

function lessonExists(existing, title, content) {
  const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
  const c = norm(content);
  return existing.some(l => norm(l.title) === norm(title) && norm(l.content || '') === c);
}

async function generateLesson(silent) {
  const genBtn = document.getElementById('generateLesson');
  if (!silent) {
    genBtn.disabled = true;
    genBtn.innerHTML = '<span class="loading-spinner-sm"></span> Generating…';
  }

  const history = await window.api.getReadingHistory(20);
  const quizResults = await window.api.getQuizResults();

  const counts = {};
  history.forEach(h => { counts[h.book] = (counts[h.book] || 0) + 1; });
  const topBooks = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);

  let focus = 'faith';
  if (quizResults.length > 0) {
    const recent = quizResults.slice(0, 5);
    const avgTemp = recent.reduce((s, r) => s + (r.score / r.total), 0) / recent.length;
    const matched = FOCUS_MAP.find(m =>
      avgTemp >= m.quizMin && avgTemp <= m.quizMax &&
      (m.books.length === 0 || m.books.some(b => topBooks.includes(b)))
    );
    focus = matched ? matched.name : 'faith';
  } else {
    const topicFromTopBook = FOCUS_MAP.find(m => m.books.length > 0 && m.books.some(b => topBooks.includes(b)));
    if (topicFromTopBook) focus = topicFromTopBook.name;
  }

  const existing = await window.api.getLessons();

  const recentSermons = await window.api.getRecentActivity('sermon_play', 5);
  const cachedTexts = await window.api.getCachedSermonTexts();
  let usedSermon = false;

  for (let i = recentSermons.length - 1; i >= 0; i--) {
    const parts = recentSermons[i].details.split(' - ');
    const code = parts[0];
    const cached = cachedTexts.find(t => t.code === code);
    if (cached) {
      const sinfo = SERMONS_DATA.find(s => s.code === code);
      const title = parts[1] || (sinfo ? sinfo.title : 'The Word');
      const paras = cached.text.split('\n\n').filter(p => {
        const t = p.trim();
        return t.length > 80 && t.length < 2000 && !t.match(/^\d+$/) && !t.startsWith('http');
      });
      const skip = ['good morning', 'let us bow', 'let us pray', 'shall we bow', 'amen', 'thank you for your', "i'm happy", "i'm so glad"];
      const meaningful = paras.filter(p => !skip.some(s => p.toLowerCase().trim().startsWith(s)));
      const selected = meaningful.slice(0, 3).map(p => '> ' + p.trim().replace(/\n/g, '\n> ')).join('\n\n');

      if (selected) {
        const coachingMap = {
          faith: 'Let this strengthen your faith. God\'s Word never changes.',
          prayer: 'Bring this before the Lord in prayer.',
          watchfulness: 'Stay awake — these words are for this hour.',
          revelation: 'Ask the Holy Spirit for understanding of these mysteries.',
          'holy spirit': 'Yield to the Holy Spirit. He leads into all truth.',
          'end times': 'We live in the days spoken of. Let this prepare your heart.',
          spiritual: 'Set your mind on things above.',
          salvation: 'His return is near. Keep your garments ready.',
          grace: 'Grace is your portion. Receive it freely.',
          love: 'Let the love of God fill your heart.',
          hope: 'Let this renew your hope in Christ.',
          overcoming: 'You are more than a conqueror through Christ.',
          wisdom: 'Ask the Lord for wisdom and understanding.'
        };
        const fullContent = selected + '\n\n--- Reflection ---\n' + (coachingMap[focus] || 'Reflect on this teaching.');

        if (!lessonExists(existing, 'From "' + title + '"', fullContent)) {
          const usedTitles = new Set(existing.map(l => l.title));
          let lessonTitle = 'From "' + title + '"';
          let counter = 1;
          while (usedTitles.has(lessonTitle)) { counter++; lessonTitle = 'From "' + title + '" (' + counter + ')'; }
          await window.api.saveLesson(lessonTitle, fullContent, [], 'sermon');
          if (!silent) toast('New lesson from sermon!', 'success');
        } else {
          if (!silent) toast('Sermon lesson already exists', 'info');
        }
        usedSermon = true;
        break;
      }
    }
  }

  if (!usedSermon) {
    const lessonSet = SMART_LESSONS[focus] || SMART_LESSONS.faith;
    const titleIdx = Math.floor(Math.random() * lessonSet.titles.length);
    const contentIdx = Math.floor(Math.random() * lessonSet.contents.length);
    const title = lessonSet.titles[titleIdx];

    const verses = [];
    for (const r of lessonSet.refs) {
      const vd = await window.api.getVerses(r.book, r.chapter, r.start, r.end);
      if (vd.length) verses.push({ ref: `${r.book} ${r.chapter}:${r.start}-${r.end}`, text: vd.map(x => x.text).join(' ') });
    }

    const applyVerses = verses.map(v => v.ref).join(', ');
    const fullContent = lessonSet.contents[contentIdx] + '\n\n--- Apply ---\nRead ' + applyVerses + ' this week and meditate on what God reveals to you through His Word.';

    if (!lessonExists(existing, title, fullContent)) {
      const usedTitles = new Set(existing.map(l => l.title));
      let finalTitle = title;
      let counter = 1;
      while (usedTitles.has(finalTitle)) { counter++; finalTitle = title + ' (' + counter + ')'; }
      await window.api.saveLesson(finalTitle, fullContent, verses, 'smart');
      if (!silent) toast('Smart Lesson generated!', 'success');
    } else {
      if (!silent) toast('Lesson already exists', 'info');
    }
  }

  if (!silent) {
    genBtn.disabled = false;
    genBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Generate Lesson';
  }
  await loadLessons();
}

async function viewLesson(id) {
  const lessons = await window.api.getLessons();
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  const verses = typeof lesson.verses === 'string' ? JSON.parse(lesson.verses) : (lesson.verses || []);
  const src = lesson.source || '';
  document.getElementById('lessonBadge').textContent = src === 'smart' ? 'Smart Lesson' : src === 'sermon' ? 'From Sermon' : 'Lesson';
  document.getElementById('lessonBadge').style.display = src ? 'inline-block' : 'none';
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonContent').innerHTML = (lesson.content || '').replace(/\n/g, '<br>');
  document.getElementById('lessonVerses').innerHTML = verses.map(v =>
    `<div class="verse-block"><div class="verse-ref">${v.ref}</div><div class="verse-text">${v.text}</div></div>`
  ).join('');
  document.getElementById('lessonView').dataset.lessonId = id;
  document.getElementById('lessonsList').style.display = 'none';
  document.getElementById('lessonsEmpty').style.display = 'none';
  document.getElementById('lessonView').style.display = 'block';
}



async function updateStats() {
  const stats = await window.api.getStats();
  const prayerPercent = Math.min(100, (stats.prayers / 50) * 100);
  const readingPercent = Math.min(100, (stats.versesRead / 1000) * 100);
  const quizPercent = stats.avgScore || 0;
  const streakPercent = Math.min(100, (stats.streak / 30) * 100);

  document.getElementById('prayerFill').setAttribute('stroke-dasharray', `${prayerPercent}, 100`);
  document.getElementById('prayerPercent').textContent = `${Math.round(prayerPercent)}%`;
  document.getElementById('readingFill').setAttribute('stroke-dasharray', `${readingPercent}, 100`);
  document.getElementById('readingPercent').textContent = `${Math.round(readingPercent)}%`;
  document.getElementById('quizFill').setAttribute('stroke-dasharray', `${quizPercent}, 100`);
  document.getElementById('quizPercent').textContent = `${Math.round(quizPercent)}%`;
  document.getElementById('streakFill').setAttribute('stroke-dasharray', `${streakPercent}, 100`);
  document.getElementById('streakPercent').textContent = `${Math.round(streakPercent)}%`;

  const books = await window.api.getMostReadBooks();
  document.getElementById('mostReadBooks').innerHTML = books.length > 0 ? books.map(b => `<div class="book-item"><span class="book-name">${b.book}</span><span class="book-count">${b.count} reads</span></div>`).join('') : '<p style="color:var(--text-muted)">Start reading to see your most read books!</p>';

  const quizResults = await window.api.getQuizResults();
  document.getElementById('quizHistory').innerHTML = quizResults.length > 0 ? quizResults.map(q => `<div class="quiz-history-item"><span>${q.date}</span><span>${q.score}/${q.total}</span><span class="temp-indicator temp-${q.spiritual_temp.toLowerCase().replace(' ', '-')}"></span><span>${q.spiritual_temp}</span></div>`).join('') : '<p style="color:var(--text-muted)">Take the daily quiz to see your history!</p>';

  await loadScriptureCoverage();
  await renderAnalytics();
}

async function loadScriptureCoverage() {
  const seen = await window.api.getSeenVerses();
  const grid = document.getElementById('scriptureCoverage');
  const bibleBooks = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
  let html = '<div style="display:flex;flex-wrap:wrap;gap:2px;">';
  for (const book of bibleBooks) {
    const bkSeen = seen.filter(s => s.book === book).length;
    const opacity = Math.min(1, 0.1 + bkSeen * 0.05);
    html += `<div class="coverage-cell" style="background:rgba(129,140,248,${opacity})" title="${book}: ${bkSeen} verses seen"></div>`;
  }
  html += '</div>';
  grid.innerHTML = html;
}

/* ---- ADVANCED ANALYTICS ---- */
async function renderAnalytics() {
  await Promise.all([
    renderReadingChart(),
    renderPrayerChart(),
    renderQuizChart(),
    renderWeeklyChart(),
    renderMonthlyChart(),
  ]);
}


function buildBarChart(data, width = 520, height = 160, opts = {}) {
  const { barColor = 'var(--accent-primary)', maxValue, showLabels = true, labelWidth = 30 } = opts;
  if (!data || data.length === 0) return '<div class="chart-empty">No data yet</div>';

  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  const padding = { top: 8, bottom: 20, left: labelWidth, right: 8 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barWidth = Math.max(4, Math.min(14, chartW / data.length - 2));
  const gap = (chartW - barWidth * data.length) / (data.length + 1);

  const bars = data.map((d, i) => {
    const barH = (d.value / max) * chartH;
    const x = padding.left + gap + i * (barWidth + gap);
    const y = padding.top + chartH - barH;
    const label = d.label || '';
    return `<rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="2" fill="${barColor}" data-value="${d.value}" data-label="${label}">
      <title>${label}: ${d.value}</title>
    </rect>`;
  }).join('');

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(p => {
    const y = padding.top + chartH * (1 - p);
    return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" stroke-width="0.5"/>`;
  }).join('');

  const labels = showLabels ? data.map((d, i) => {
    const x = padding.left + gap + i * (barWidth + gap) + barWidth / 2;
    const label = (d.label || '').length > 3 ? (d.label || '').slice(0, 3) : (d.label || '');
    return `<text x="${x}" y="${height - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="8" font-family="var(--font-sans)">${label}</text>`;
  }).join('') : '';

  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${barColor}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${barColor}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g class="chart-grid">${gridLines}</g>
    <g class="chart-bars">${bars}</g>
    <g class="chart-axis">${labels}</g>
  </svg>`;
}

function buildLineChart(data, width = 520, height = 160, opts = {}) {
  const { lineColor = 'var(--accent-primary)', maxValue, fillArea = true } = opts;
  if (!data || data.length === 0) return '<div class="chart-empty">No data yet</div>';

  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  const padding = { top: 8, bottom: 20, left: 4, right: 4 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - (d.value / max) * chartH;
    return { x, y, value: d.value, label: d.label || '' };
  });

  if (points.length === 1) {
    const cx = width / 2;
    const cy = height / 2;
    return `<svg viewBox="0 0 ${width} ${height}">
      <circle cx="${cx}" cy="${cy}" r="3" fill="${lineColor}"/>
      <text x="${cx}" y="${cy + 16}" text-anchor="middle" fill="var(--text-muted)" font-size="11">${points[0].value}</text>
    </svg>`;
  }

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const fillD = pathD + ` L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z`;
  const dots = points.map(p =>
    `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="3" fill="${lineColor}">
      <title>${p.label ? p.label + ': ' : ''}${p.value}</title>
    </circle>`
  ).join('');

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(p => {
    const y = padding.top + chartH * (1 - p);
    return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" stroke-width="0.5"/>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="${lineColor}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g class="chart-grid">${gridLines}</g>
    ${fillArea ? `<path class="chart-line-fill" d="${fillD}" fill="url(#lineGradient)"/>` : ''}
    <path class="chart-line" d="${pathD}" stroke="${lineColor}"/>
    <g class="chart-dots">${dots}</g>
  </svg>`;
}

function buildGroupedBarChart(series, width = 600, height = 200) {
  if (!series || series.length === 0 || !series[0].data || series[0].data.length === 0) return '<div class="chart-empty">No data yet</div>';
  
  const numGroups = series[0].data.length;
  const numSeries = series.length;
  const padding = { top: 8, bottom: 24, left: 4, right: 4 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const groupWidth = chartW / numGroups;
  const barWidth = Math.max(3, Math.min(10, (groupWidth - 4) / numSeries));
  const colors = ['var(--accent-primary)', 'var(--accent-success)', 'var(--accent-warning)'];

  const allValues = series.flatMap(s => s.data.map(d => d.value));
  const max = Math.max(...allValues, 1);

  const bars = series.map((s, si) => {
    return s.data.map((d, i) => {
      const barH = (d.value / max) * chartH;
      const x = padding.left + i * groupWidth + 2 + si * barWidth;
      const y = padding.top + chartH - barH;
      return `<rect class="monthly-bar-group" x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="1.5" fill="${colors[si % colors.length]}" opacity="0.85">
        <title>${s.name}: ${d.label || ''} ${d.value}</title>
      </rect>`;
    }).join('');
  }).join('');

  const labels = series[0].data.map((d, i) => {
    const x = padding.left + i * groupWidth + groupWidth / 2;
    const label = (d.label || '').length > 3 ? (d.label || '').slice(0, 3) : (d.label || '');
    return `<text x="${x}" y="${height - 6}" text-anchor="middle" fill="var(--text-muted)" font-size="7" font-family="var(--font-sans)">${label}</text>`;
  }).join('');

  const legend = series.map((s, i) => 
    `<div class="chart-legend-item"><span class="chart-legend-dot" style="background:${colors[i % colors.length]}"></span>${s.name}</div>`
  ).join('');

  return `<svg viewBox="0 0 ${width} ${height}">
    <g class="chart-bars">${bars}</g>
    <g class="chart-axis">${labels}</g>
  </svg><div class="chart-legend">${legend}</div>`;
}

async function renderReadingChart() {
  const data = await window.api.getReadingCountsByDate(30);
  if (!data || data.length === 0) {
    document.getElementById('readingChart').innerHTML = '<div class="chart-empty">Start reading to see your activity</div>';
    return;
  }
  const chartData = data.map(d => ({
    label: d.date.slice(5),
    value: d.count,
  }));
  const svg = buildBarChart(chartData, 520, 140, {
    barColor: 'var(--accent-primary)',
    showLabels: true,
    labelWidth: 28,
  });
  document.getElementById('readingChart').innerHTML = svg;
}

async function renderPrayerChart() {
  const data = await window.api.getPrayerCountsByDate(30);
  if (!data || data.length === 0) {
    document.getElementById('prayerChart').innerHTML = '<div class="chart-empty">Start praying to see your activity</div>';
    return;
  }
  const chartData = data.map(d => ({
    label: d.date.slice(5),
    value: d.count,
  }));
  const svg = buildBarChart(chartData, 520, 140, {
    barColor: 'var(--accent-success)',
    showLabels: true,
    labelWidth: 28,
  });
  document.getElementById('prayerChart').innerHTML = svg;
}

async function renderQuizChart() {
  const results = await window.api.getQuizResults();
  if (!results || results.length < 2) {
    document.getElementById('quizChart').innerHTML = '<div class="chart-empty">Complete more quizzes to see your trend</div>';
    return;
  }
  const chartData = results.slice(0, 20).reverse().map(r => ({
    label: r.date ? r.date.slice(5) : '',
    value: Math.round((r.score / r.total) * 100),
  }));
  const svg = buildLineChart(chartData, 520, 140, {
    lineColor: 'var(--accent-warning)',
    fillArea: true,
  });
  document.getElementById('quizChart').innerHTML = svg;
}

async function renderWeeklyChart() {
  const dayCounts = await window.api.getWeeklyPattern();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const total = dayCounts.reduce((a, b) => a + b, 0);
  if (total === 0) {
    document.getElementById('weeklyChart').innerHTML = '<div class="chart-empty">Start reading to see your weekly pattern</div>';
    return;
  }
  const chartData = dayCounts.map((count, i) => ({
    label: dayNames[i],
    value: count,
  }));
  const svg = buildBarChart(chartData, 520, 140, {
    barColor: 'var(--accent-info)',
    showLabels: true,
    labelWidth: 32,
  });
  document.getElementById('weeklyChart').innerHTML = svg;
}

async function renderMonthlyChart() {
  const monthly = await window.api.getMonthlyStats();
  if (!monthly || monthly.length === 0) {
    document.getElementById('monthlyChart').innerHTML = '<div class="chart-empty">No data yet for monthly overview</div>';
    return;
  }
  const last6 = monthly.slice(-6);
  const series = [
    { name: 'Verses', data: last6.map(m => ({ label: m.month.slice(5), value: m.verses })) },
    { name: 'Prayers', data: last6.map(m => ({ label: m.month.slice(5), value: m.prayers })) },
    { name: 'Quizzes', data: last6.map(m => ({ label: m.month.slice(5), value: m.quizzes })) },
  ];
  const svg = buildGroupedBarChart(series, 600, 180);
  document.getElementById('monthlyChart').innerHTML = svg;
}

async function loadBookmarks() {
  const bookmarks = await window.api.getBookmarks();
  const container = document.getElementById('bookmarksList');
  if (bookmarks.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">📖</div>
      <h4>No bookmarks saved yet</h4>
      <p>Tap the bookmark icon next to any verse in the Bible Reader to save it here for later meditation.</p>
    </div>`;
  } else {
    const tree = buildTree(bookmarks, (b) => b.book);
    renderTree(container, tree,
      (item) => `<div class="tree-leaf" onclick="event.stopPropagation();" data-action="navigate-reading" data-book="${item.book}" data-chapter="${item.chapter}"><svg class="leaf-icon" viewBox="0 0 24 24" width="14" height="14"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span class="tree-label">${item.book} ${item.chapter}:${item.verse}</span><span class="tree-text">${item.text.substring(0, 60)}...</span></div>`,
      'bookmarksTree'
    );
  }
}

async function toggleBookmark(book, chapter, verse, text) {
  const res = await window.api.saveBookmark(book, chapter, verse, text);
  if (res.success) {
    toast(res.saved ? 'Bookmark saved' : 'Bookmark removed', 'success');
    // Refresh UI if needed. If in reader, update the icon state.
    if (currentPage === 'bible-reader') {
      const btn = document.querySelector(`[data-action="toggle-bookmark"][data-verse="${verse}"]`);
      if (btn) btn.classList.toggle('active', res.saved);
    } else if (currentPage === 'bookmarks') {
      await loadBookmarks();
    }
  }
}

async function updateSpiritualTemp() {
  const quizResults = await window.api.getQuizResults();
  const fill = document.getElementById('tempFill');
  const label = document.getElementById('tempLabel');

  if (quizResults.length === 0) {
    fill.style.width = '50%';
    label.textContent = 'Not assessed';
    return;
  }

  const recent = quizResults.slice(0, 7);
  const avgScore = recent.reduce((sum, q) => sum + (q.score / q.total), 0) / recent.length;
  const percentage = avgScore * 100;

  let temp, color;
  if (percentage >= 85) { temp = 'On Fire'; color = '#e74c3c'; }
  else if (percentage >= 65) { temp = 'Hot'; color = '#f39c12'; }
  else if (percentage >= 45) { temp = 'Warm'; color = '#f1c40f'; }
  else if (percentage >= 25) { temp = 'Cooling'; color = '#3498db'; }
  else { temp = 'Cold'; color = '#95a5a6'; }

  fill.style.width = `${percentage}%`;
  fill.style.background = color;
  label.textContent = temp;
}

function setupSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  document.getElementById('searchToggle').onclick = () => { overlay.classList.toggle('active'); if (overlay.classList.contains('active')) input.focus(); };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('active'); };

  let searchTimeout;
  input.oninput = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const query = input.value.trim();
      if (query.length < 3) { results.innerHTML = ''; return; }
      const verses = await window.api.searchVerses(query, 10);
      results.innerHTML = verses.map(v => `<div class="search-result-item" data-action="search-result" data-book="${v.book}" data-chapter="${v.chapter}"><div class="verse-ref">${v.book} ${v.chapter}:${v.verse}</div><div class="verse-text">${v.text.substring(0, 150)}${v.text.length > 150 ? '...' : ''}</div></div>`).join('');
    }, 300);
  };
}

function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  let isDark = true;
  toggle.onclick = () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };
}

const KEY_PAGE_MAP = ['dashboard', 'daily-verse', 'bible-reader', 'prayers', 'quiz', 'sermons', 'lessons', 'notes', 'bookmarks', 'stats'];
const KEY_LABELS = ['1-Dash', '2-Verse', '3-Bible', '4-Pray', '5-Quiz', '6-Sermon', '7-Lesson', '8-Note', '9-Book', '0-Progress'];
let glowTimeout = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.getElementById('searchOverlay').classList.remove('active');
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchOverlay').classList.toggle('active'); document.getElementById('searchInput').focus(); }
  const keyNum = parseInt(e.key);
  if (e.altKey && !isNaN(keyNum) && keyNum >= 1 && keyNum <= 9) {
    e.preventDefault();
    const page = KEY_PAGE_MAP[keyNum - 1];
    if (page) navigateTo(page);
    showKeypadGlow(keyNum);
  }
  if (e.altKey && (e.key === '0' || e.key === 'Numpad0')) { e.preventDefault(); navigateTo('stats'); showKeypadGlow(0); }
  if (e.code === 'Numpad1' && e.altKey) { e.preventDefault(); navigateTo('dashboard'); showKeypadGlow(1); }
  if (e.code === 'Numpad2' && e.altKey) { e.preventDefault(); navigateTo('daily-verse'); showKeypadGlow(2); }
  if (e.code === 'Numpad3' && e.altKey) { e.preventDefault(); navigateTo('bible-reader'); showKeypadGlow(3); }
  if (e.code === 'Numpad4' && e.altKey) { e.preventDefault(); navigateTo('prayers'); showKeypadGlow(4); }
  if (e.code === 'Numpad5' && e.altKey) { e.preventDefault(); navigateTo('quiz'); showKeypadGlow(5); }
  if (e.code === 'Numpad6' && e.altKey) { e.preventDefault(); navigateTo('sermons'); showKeypadGlow(6); }
  if (e.code === 'Numpad7' && e.altKey) { e.preventDefault(); navigateTo('lessons'); showKeypadGlow(7); }
  if (e.code === 'Numpad8' && e.altKey) { e.preventDefault(); navigateTo('notes'); showKeypadGlow(8); }
  if (e.code === 'Numpad9' && e.altKey) { e.preventDefault(); navigateTo('bookmarks'); showKeypadGlow(9); }
  if (e.code === 'Numpad0' && e.altKey) { e.preventDefault(); navigateTo('stats'); showKeypadGlow(0); }
});

function showKeypadGlow(num) {
  const existing = document.querySelector('.keypad-glow');
  if (existing) existing.remove();
  clearTimeout(glowTimeout);
  const el = document.createElement('div');
  el.className = 'keypad-glow';
  el.textContent = 'Alt+' + num + '  ' + (KEY_LABELS[num] || '');
  el.style.cssText = 'position:fixed;bottom:84px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(129,140,248,0.9),rgba(167,139,250,0.9));color:white;padding:8px 20px;border-radius:8px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 0 30px rgba(129,140,248,0.5),0 4px 12px rgba(0,0,0,0.3);pointer-events:none;animation:keypadFadeIn 0.15s ease-out;';
  document.body.appendChild(el);
  glowTimeout = setTimeout(() => { el.style.transition = 'opacity 0.4s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }, 1200);
}

function setupWindowControls() {
  document.getElementById('winMinimize')?.addEventListener('click', () => window.api.minimizeWindow());
  document.getElementById('winMaximize')?.addEventListener('click', () => window.api.maximizeWindow());
  document.getElementById('winClose')?.addEventListener('click', () => window.api.closeWindow());
}
