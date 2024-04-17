import BaseElement from './base-element';

class BackDrop extends BaseElement {
  constructor() {
    super({ classes: ['backdrop'] });
  }

  show() {
    document.body.append(this.element);
  }

  hide() {
    this.remove();
  }
}

const backdrop = new BackDrop();

export default backdrop;
