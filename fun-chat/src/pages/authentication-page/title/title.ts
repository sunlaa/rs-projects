import BaseElement from '@/utils/components/base-element';

export default class Title extends BaseElement {
  constructor() {
    super({
      tag: 'h1',
      className: ['entry-page__title'],
      textContent: 'Welcome to Fun Chat!',
    });
  }
}
