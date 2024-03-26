import BaseElement from '../../../../utils/components/base-element';

export default class PageCounter extends BaseElement {
  page: number = 0;

  constructor() {
    super({ className: ['page-counter'] });
    this.setPage('Page №1');
  }

  setPage(x: string) {
    this.page = +x[6] - 1;
    this.setContent(x);
  }
}
