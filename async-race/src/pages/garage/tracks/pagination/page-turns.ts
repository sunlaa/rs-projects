import BaseElement from '../../../../utils/components/base-element';

export default class PageTurns extends BaseElement {
  next: BaseElement;

  prev: BaseElement;

  constructor() {
    super({ className: ['page-turns'] });

    this.prev = new BaseElement({
      className: ['page-turn', 'prev'],
      content: 'prev',
    });

    this.next = new BaseElement({
      className: ['page-turn', 'next'],
      content: 'next',
    });

    this.appendChildren(this.prev, this.next);
  }
}
