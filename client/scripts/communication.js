
class Communication {
  constructor() {
    this.identifier = null;
    this.identifyClient();

    this._ping = false;
    this.startPing();
  }

  identifyClient() {
    const cookies = new Cookies();
    let identifier = cookies.getCookie('identifier');
    if (!identifier) {
      identifier = Date.now();
      cookies.setCookie('identifier', identifier);
    }
    this.identifier = identifier;
  }

  startPing() {
    this._ping = true;
    this.ping();
  }
  stopPing() {
    this._ping = false;
  }
  ping() {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: {id: this.identifier, type: 'ping'},
      success: (msg) => {
        console.log('success', msg);
        if (msg.update) window.location.href = msg.update;
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log('error', errorThrown);
      }
    });
    if (this._ping) setTimeout(this.ping.bind(this), 3000);
  }
}
