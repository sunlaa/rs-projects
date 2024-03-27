import BaseElement from '../../../../utils/components/base-element';

export default class PageTurns extends BaseElement {
  next: BaseElement;

  prev: BaseElement;

  constructor() {
    super({ className: ['page-turns'] });

    this.prev = new BaseElement({
      className: ['button', 'prev'],
      content: 'Prev',
    });

    this.next = new BaseElement({
      className: ['button', 'next'],
      content: 'Next',
    });

    this.appendChildren(this.prev, this.next);
  }
}
