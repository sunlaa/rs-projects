import BaseElement from '@/utils/components/base-element';

export default class LogOut extends BaseElement<HTMLAnchorElement> {
  constructor() {
    super({
      tag: 'a',
      href: '#entry',
      textContent: 'Log Out',
      className: ['header__log-out', 'button'],
    });
  }
}
