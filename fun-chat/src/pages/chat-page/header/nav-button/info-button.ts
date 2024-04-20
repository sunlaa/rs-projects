import BaseElement from '@/utils/components/base-element';

export default class InfoButton extends BaseElement<HTMLAnchorElement> {
  constructor() {
    super({
      tag: 'a',
      href: '#info',
      textContent: 'Info',
      classes: ['header__info', 'button'],
    });
  }
}
