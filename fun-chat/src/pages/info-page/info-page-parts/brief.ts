import BaseElement from '@/utils/components/base-element';

export default class Brief extends BaseElement {
  constructor(
    textContent: string,
    classes?: string[],
    ...child: (BaseElement | HTMLElement | null)[]
  ) {
    super({ tag: 'p', textContent, classes: ['intro-page__brief'] }, ...child);
    if (classes) {
      classes.forEach((className) => this.addClass(className));
    }
  }
}
