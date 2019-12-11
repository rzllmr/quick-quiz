const Clients = require('./clients');


class Controller {
  constructor() {
    this.clients = new Clients();
    this.changed = false;
  }

  respond(query, response) {
    const slot = this.clients.tick(query.id);

    if (query.type === 'ping') {
      const msg = {
        update: null
      };

      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(msg));
    } else {
      console.log(slot + ' post:', query);
    }
  }
};

module.exports = Controller;
