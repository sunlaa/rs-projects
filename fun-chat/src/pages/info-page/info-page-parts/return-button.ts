import BaseElement from '@/utils/components/base-element';

export default class ReturnButton extends BaseElement<HTMLAnchorElement> {
  constructor(prev: string) {
    super({
      tag: 'a',
      textContent: 'Return',
      classes: ['info-page__return', 'button'],
      href: `#${prev}`,
    });
  }
}
