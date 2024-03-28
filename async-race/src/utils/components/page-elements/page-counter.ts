import BaseElement from '../base-element';

export default class PageCounter extends BaseElement {
  constructor() {
    super({ className: ['page-counter'] });
  }

  updatePage(num: number) {
    this.setContent(`Page ${num}`);
  }
}
