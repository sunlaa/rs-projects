import BaseElement from '@/utils/components/base-element';

export default class Title extends BaseElement {
  constructor(textContent: string) {
    super({
      tag: 'h1',
      className: ['entry-page__title'],
      textContent,
    });
  }
}
