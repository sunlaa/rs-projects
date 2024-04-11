import BaseElement from '@/utils/components/base-element';

export default class Info extends BaseElement {
  constructor() {
    super({ textContent: 'Info', className: ['header__info', 'button'] });
  }
}
