// module for serving static files

const fs = require('fs');
const path = require('path');

const statics = {
  serve: function(req, res) {
    req.url = req.url.split('?')[0];
    const filePath = path.join(__dirname, '../client', req.url);
    if (req.url.match('\.html$')) {
      fs.readFile(filePath, 'UTF-8', function(err, html) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      });
    } else if (req.url.match('\.css$')) {
      const fileStream = fs.createReadStream(filePath, 'UTF-8');
      res.writeHead(200, {'Content-Type': 'text/css'});
      fileStream.pipe(res);
    } else if (req.url.match('\.js$')) {
      const fileStream = fs.createReadStream(filePath, 'UTF-8');
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fileStream.pipe(res);
    } else if (req.url.match('\.png$')) {
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, {'Content-Type': 'image/png'});
      fileStream.pipe(res);
    } else if (req.url.match('\.jpg$')) {
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      fileStream.pipe(res);
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('No Page Found');
    }
  }
};

module.exports = statics;
