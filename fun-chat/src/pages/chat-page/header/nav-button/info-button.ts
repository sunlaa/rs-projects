import BaseElement from '@/utils/components/base-element';

export default class Info extends BaseElement {
  constructor() {
    super({ textContent: 'Info', classes: ['header__info', 'button'] });
  }
}
