const https = require('https');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(outputDir, 'kjv.json');

function downloadKJV() {
  if (fs.existsSync(outputFile)) {
    const stats = fs.statSync(outputFile);
    if (stats.size > 100000) {
      console.log('KJV already downloaded:', (stats.size / 1024 / 1024).toFixed(2) + 'MB');
      return Promise.resolve();
    }
  }

  const urls = [
    'https://raw.githubusercontent.com/BibleJS/BibleApp/master/dist/versions/kjv.json',
    'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/json/kjv/kjv.json',
  ];

  return new Promise((resolve, reject) => {
    console.log('Downloading KJV Bible...');
    https.get(urls[0], (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(outputFile);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('KJV Bible downloaded successfully');
          resolve();
        });
      } else {
        reject(new Error('Failed to download KJV'));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

downloadKJV().catch(console.error);
