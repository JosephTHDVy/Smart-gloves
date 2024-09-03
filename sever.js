const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3000;

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'POST' && parsedUrl.pathname === '/data') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('Received data:', body);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Data received');
    });
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
