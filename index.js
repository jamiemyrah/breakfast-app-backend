const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'Application\json' });
    res.write()
}).listen(4000);