const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const publicDir = path.join(__dirname, '../public/');
const index = path.join(publicDir, 'index.html');

const parseRequestInfo = (url) => {
  const parts = url.split('.');
  const fileExtension = parts[parts.length - 1];
  const fileName = parts[parts.length - 2];
  const filePath = path.join(publicDir, url);
  let fileType = null;
  let fileEncoding = null;

  switch(fileExtension) {
    case 'css':
      fileEncoding = 'utf8';
      fileType = 'text/css';
      break;
    case 'js':
      fileEncoding = 'utf8';
      fileType = 'text/javascript';
      break;
    case 'json':
      fileEncoding = 'utf8';
      fileType = 'application/json';
      break;
    case 'png':
      fileType = 'image/png'
      break;
  };

  return { fileEncoding, filePath, fileType };
};

const server = http.createServer((req, res) => {
  const { fileEncoding, filePath, fileType } = parseRequestInfo(req.url);
  console.log(parseRequestInfo(req.url));

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(fs.readFileSync(index, { encoding: 'utf8' }));
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', fileType);
    res.write(fs.readFileSync(filePath, { encoding: fileEncoding }));
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
