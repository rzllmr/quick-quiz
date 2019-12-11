
class Clients {
  constructor() {
    this.slots = [];
    for (let idx = 0; idx < 10; idx++) {
      this.slots.push({id: 0, time: 0});
    }
  }

  findSlot(identifier = 0) {
    return this.slots.findIndex((player) => {
      return player.id === identifier;
    });
  }

  tick(identifier) {
    const currentTime = Date.now(); // in ms
    let slot = this.findSlot(identifier);
    if (slot === -1) {
      slot = this.connect(identifier);
    }
    if (slot !== -1) {
      this.slots[slot].time = currentTime;
    }
    // check for disconnect
    for (let idx = 0; idx < this.slots.length; idx++) {
      if (this.slots[idx].id !== 0 &&
          currentTime - this.slots[idx].time > 10000) {
        this.disconnect(this.slots[idx].id);
      }
    }
    return slot;
  }

  connect(identifier) {
    const freeSlot = this.findSlot();
    if (freeSlot !== -1) {
      this.slots[freeSlot].id = identifier;
      console.log('connected', freeSlot);
      this.printSlots();
    }
    return freeSlot;
  }

  disconnect(identifier) {
    const slot = this.findSlot(identifier);
    if (slot !== -1) {
      this.slots[slot].id = 0;
      this.slots[slot].time = 0;
      console.log('disconnected', slot);
      this.printSlots();
    }
  }

  printSlots() {
    console.log('client slots:');
    const line = [];
    for (let i = 0; i < this.slots.length; i++) {
      line.push(i + ':' + (this.slots[i].id !== 0 ? 'used' : 'free'));
    }
    console.log(line.join(' '));
  }
}

module.exports = Clients;
