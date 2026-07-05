const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3199;
const ROOT = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function tryListen(port) {
  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, { 
      'Content-Type': contentType, 
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*' 
    });
    fs.createReadStream(filePath).pipe(res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, attempting to free it...`);
      try {
        execSync(`fuser -k ${port}/tcp 2>/dev/null`, { stdio: 'ignore' });
        setTimeout(() => tryListen(port), 500);
      } catch (e) {
        console.log(`Could not free port ${port}. Is another server running?`);
        process.exit(1);
      }
    } else {
      console.error('Server error:', err.message);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    console.log(`Faith Walk Dev Server running at http://localhost:${port}`);
  });
}

tryListen(PORT);
