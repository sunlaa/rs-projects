import BaseElement from './base-element';

export default class Anchor extends BaseElement<HTMLAnchorElement> {
  constructor(
    textContent: string,
    href: string,
    classes?: string[],
    ...child: (BaseElement | HTMLElement)[]
  ) {
    super({ tag: 'a', target: '_blank', href, textContent }, ...child);
    if (classes) {
      classes.forEach((className) => this.addClass(className));
    }
  }
}
