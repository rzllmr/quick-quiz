const http = require('http');
const ip = require('ip');
const statics = require('./statics');
const Controller = require('./controller');


const controller = new Controller();
const server = http.createServer();

server.on('request', (request, response) => {
  const device = request.headers['user-agent'].includes('Mobile') ? 'phone' : 'desktop';
  console.log(`req ${request.method} ${request.url}`);

  if (request.method === 'POST') {
    let body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });

    request.on('end', function() {
      controller.respond(queryToObject(body), response);
    });
  } else {
    if (request.url === '/') {
      if (device === 'desktop') request.url = '/host/index.html';
      else request.url = '/player/index.html';
    }
    statics.serve(request, response);
  }
});

function queryToObject(query) {
  const object = {};
  const queryList = query.split('&');
  for (let i = 0; i < queryList.length; i++) {
    const pair = queryList[i].split('=');
    object[pair[0]] = pair[1];
  };
  return object;
}

port = 8080;
server.listen(port);
console.log('Server running at http://' + ip.address() + ':' + port);
