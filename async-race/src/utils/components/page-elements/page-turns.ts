import BaseElement from '../base-element';

export default class PageTurns extends BaseElement {
  prev: BaseElement;

  next: BaseElement;

  constructor() {
    super({ className: ['page-turns'] });

    this.prev = new BaseElement({
      className: ['page-turn', 'button'],
      content: 'Prev',
    });

    this.next = new BaseElement({
      className: ['page-turn', 'button'],
      content: 'Next',
    });

    this.appendChildren(this.prev, this.next);
  }
}
