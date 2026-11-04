const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;

// Endereço do backend (opcional): FA_API_BASE=http://localhost:3000
let apiBaseScript = '';
if (process.env.FA_API_BASE) {
  const base = String(process.env.FA_API_BASE).trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(base)) {
    apiBaseScript = '<script>window.FA_API_BASE=' + JSON.stringify(base).replace(/</g, '\\u003c') + ';</script>';
  } else {
    console.warn('FA_API_BASE ignorado: deve começar por http:// ou https://');
  }
}
const rootDir = path.join(__dirname, 'src');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

function safePath(requestPath) {
  const normalized = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  if (!normalized || normalized === '.' || normalized === path.sep) {
    return '/';
  }
  return normalized.startsWith('..') ? null : normalized;
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = safePath(decodeURIComponent(requestUrl.pathname));

  if (!pathname || pathname === '/') {
    pathname = '/index.html';
  }

  const requestedPath = path.join(rootDir, pathname);
  const pagePath = path.join(rootDir, 'pages', pathname);
  const fullPath = pathname.toLowerCase().endsWith('.html') && !fs.existsSync(requestedPath)
    ? pagePath
    : requestedPath;
  if (!fullPath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Com FA_API_BASE definido (ex.: no Docker), o endereço do backend é injetado em todas as páginas,
    // sem ser preciso editar src/js/core/config.js.
    if (ext === '.html' && apiBaseScript) {
      fs.readFile(fullPath, 'utf8', (readErr, html) => {
        if (readErr) { res.writeHead(500); res.end('Erro ao ler a página'); return; }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(html.replace('</head>', apiBaseScript + '</head>'));
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(fullPath).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Frontend running at http://localhost:${port}`);
});
