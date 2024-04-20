import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';

export default class UserName extends BaseElement {
  firstApply = true;

  constructor() {
    super({ tag: 'p', classes: ['header__user-name'] });

    ws.socket.addEventListener('message', this.updateName);
  }

  updateName = () => {
    if (this.firstApply) {
      this.setContent(`User: ${ws.user}`);
    }
    this.firstApply = false;
  };
}
