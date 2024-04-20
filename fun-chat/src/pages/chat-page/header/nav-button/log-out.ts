import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';

export default class LogOut extends BaseElement<HTMLAnchorElement> {
  constructor() {
    super({
      textContent: 'Log Out',
      classes: ['header__log-out', 'button'],
    });

    this.addListener('click', () => {
      ws.logOut();
    });
  }
}
