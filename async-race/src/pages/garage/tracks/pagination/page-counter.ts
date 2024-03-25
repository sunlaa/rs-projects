import BaseElement from '../../../../utils/components/base-element';

export default class PageCounter extends BaseElement {
  constructor() {
    super({ className: ['page-counter'] });
    this.setPage('1');
  }

  setPage(x: string) {
    this.setContent(x);
  }
}
