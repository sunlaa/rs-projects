import BaseElement from '@/utils/components/base-element';
import { WSocket } from '@/web-socket/web-socket';

export default class UserName extends BaseElement {
  name: string = '';

  constructor() {
    super({ tag: 'h2', className: ['header__user-name'] });
  }

  update(ws: WSocket) {
    this.setContent(ws.user);
  }
}
