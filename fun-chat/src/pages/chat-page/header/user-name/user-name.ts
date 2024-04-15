import BaseElement from '@/utils/components/base-element';
import { WSocket } from '@/web-socket/web-socket';

export default class UserName extends BaseElement {
  constructor() {
    super({ tag: 'p', classes: ['header__user-name'] });
  }

  update(ws: WSocket) {
    this.setContent(`User: ${ws.user}`);
  }
}
