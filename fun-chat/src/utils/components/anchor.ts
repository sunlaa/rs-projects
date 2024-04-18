import BaseElement from './base-element';

export default class Anchor extends BaseElement<HTMLAnchorElement> {
  constructor(textContent: string, href: string, classes?: string[]) {
    super({ tag: 'a', target: '_blank', href, textContent });
    if (classes) {
      classes.forEach((className) => this.addClass(className));
    }
  }
}
