const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3443;
const MIME = {
  '.html':'text/html','.css':'text/css','.js':'text/javascript',
  '.json':'application/json','.svg':'image/svg+xml','.png':'image/png',
};

http.createServer((req, res) => {
  let f = req.url === '/' ? 'index.html' : req.url.slice(1);
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) return res.writeHead(404).end('Not found');
  const ext = path.extname(p);
  res.writeHead(200, {'Content-Type': MIME[ext]||'text/plain', 'Cache-Control':'no-cache'});
  fs.createReadStream(p).pipe(res);
}).listen(PORT, '0.0.0.0', () => {
  const net = require('os').networkInterfaces();
  const ip = Object.values(net).flat().find(i => i.family==='IPv4'&&!i.internal)?.address || 'localhost';
  console.log(`\n  🌐  Faith Walk PWA ready!\n`);
  console.log(`  📱  On your phone, open:  http://${ip}:${PORT}\n`);
  console.log(`  📲  Then tap "Add to Home Screen" to install as an app\n`);
});
