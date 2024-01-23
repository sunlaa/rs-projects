export class Timer {
  constructor(elem) {
    this.elem = elem;
    this.sec = 0;
    this.min = 0;
    this.timerId = null;
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  start() {
    if (!this.timerId) {
      this.timerId = setInterval(this.update, 1000);
    }
  }

  stop() {
    this.sec = 0;
    this.min = 0;
    this.render();
    clearInterval(this.timerId);
    this.timerId = null;
  }

  update() {
    this.sec++;

    if (this.sec === 60) {
      this.sec = 0;
      this.min++;
    }

    this.render();
  }

  render() {
    const time = `${this.mod(this.min)} : ${this.mod(this.sec)}`;
    this.elem.textContent = time;
  }

  mod(value) {
    return value < 10 ? '0' + value : value;
  }
}
