import BaseElement from '../base-element';

export default class TotalCounter extends BaseElement {
  countName: string;

  constructor(countName: string) {
    super({ className: ['total-counter'] });
    this.countName = countName;
  }

  updateCounter(num: string) {
    this.setContent(`${this.countName}: ${num}`);
  }
}
