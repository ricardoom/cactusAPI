const http = require('http');
const { getCacti, getCactus } = require('./control/cactiControl');
const server = http.createServer((req, res) => {
  if (req.url === '/api/cacti' && req.method === 'GET') {
    getCacti(req, res);
  } else if (req.url.match(/\/api\/cacti\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getCactus(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'route dont done exist yo' }));
  }
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server done serving on ${PORT}`));
