import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';

export default class LogOut extends BaseElement {
  constructor() {
    super({ textContent: 'Log Out', className: ['header__log-out'] });

    this.addListener('click', () => {
      ws.logOut();
    });
  }
}
