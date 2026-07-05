const fs = require('fs');
const path = require('path');

function setupBible() {
  const kjvPath = path.join(__dirname, 'data', 'kjv.json');
  if (fs.existsSync(kjvPath)) {
    const stats = fs.statSync(kjvPath);
    console.log('KJV Bible file found:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
    if (stats.size > 100000) { console.log('Bible data ready.'); return true; }
  }
  console.log('No Bible data found. Run the app to download it.');
  return false;
}

module.exports = setupBible;
