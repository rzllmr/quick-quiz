
class Modification {
  constructor() {
    const url = window.location.href.split('?');
    if (url.length === 2) {
      console.log('query:', this.queryToObject(url[1]));
    }
  }

  queryToObject(query) {
    const object = {};
    const queryList = query.split('&');
    for (let i = 0; i < queryList.length; i++) {
      const pair = queryList[i].split('=');
      object[pair[0]] = pair[1];
    };
    return object;
  }
}
