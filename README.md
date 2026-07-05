# Faith Walk - Daily Christian Growth Companion

A modern Linux desktop application to help you stay faithful to Jesus Christ and grow as a Christian. Built with Electron, featuring the King James Bible, prayer journal, daily spiritual quizzes, William Marrion Branham sermons, and personalized Bible lessons.

## Features

### Daily Verse
- Fresh KJV verse every day you haven't seen before
- Track verses you've read across sessions
- Save verses to your notes

### Bible Reader
- Full KJV Bible (66 books) with chapter/verse navigation
- Read specific verse ranges
- Track your reading history

### Prayer Journal
- Write and save your prayers
- Reference verses with prayers
- Review your prayer history

### Daily Spiritual Temperature Quiz
- 10 questions to assess your spiritual state
- Tracks: On Fire, Hot, Warm, Cooling, Cold
- Personalized encouragement and scripture based on results
- Weekly spiritual temperature trend in sidebar

### William Marrion Branham Sermons
- Curated sermons including the Seven Seals series
- Audio streaming directly in the app
- Filter by category: Seven Seals, Revelation, End Times, Signs, Spiritual Growth
- Links to download and more info

### Personalized Lessons
- AI-generated lessons based on your reading patterns
- Topics: Seven Seals, Prayer, Watchfulness, Holy Spirit, Faith, etc.
- Track lesson completion

### Study Notes
- Create notes with verse references
- Organize your revelations and study insights

### Progress Dashboard
- Prayer count, verses read, unique verses, streak
- Circular progress indicators
- Quiz history with spiritual temperature
- Scripture coverage visualization
- Most-read books tracking

### Search
- Quick Bible verse search (Ctrl+K)
- Search by keyword or topic

## Requirements

- Node.js (v18 or higher)
- npm
- Linux desktop environment

## Setup

1. **Install dependencies:**
```bash
cd faith-walk
npm install
```

2. **Add the KJV Bible data:**

The app needs the full King James Bible in JSON format. Place a file at `data/kjv.json` with this structure:

```json
[
  {
    "name": "Genesis",
    "chapters": [
      {
        "number": 1,
        "verses": [
          {"number": 1, "text": "In the beginning God created the heaven and the earth."},
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

You can download a pre-formatted KJV JSON from:
- https://github.com/BibleJS/BibleApp
- https://github.com/scrollmapper/bible_databases

Or run the download script (may need to adjust the URL):
```bash
node scripts/download-kjv.js
```

3. **Run the app:**
```bash
npm start
```

## Keyboard Shortcuts

- `Ctrl+K` - Open Bible search
- `Esc` - Close search overlay

## Data Storage

All your data (prayers, notes, quiz results, reading history) is stored locally in SQLite at:
- Linux: `~/.config/faith-walk/faithwalk.db`

## Theme

Toggle between dark and light themes using the sun/moon icon in the top bar.

## Spiritual Temperature Scale

| Temperature | Score | Meaning |
|------------|-------|---------|
| On Fire | 85-100% | Burning hot for Christ |
| Hot | 65-84% | Strong spiritual fire |
| Warm | 45-64% | Good but needs feeding |
| Cooling | 25-44% | Warning - fire dimming |
| Cold | 0-24% | Urgent - return to God! |

## Sermon Sources

William Marrion Branham sermons are streamed from:
- https://message.branham.org

The app includes curated sermons focused on:
- The Seven Seals revelation
- End times prophecy
- Signs of Christ's return
- Spiritual growth and consecration
- Preparing the Bride for Christ's return

## License

MIT
