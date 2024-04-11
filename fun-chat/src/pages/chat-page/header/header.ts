import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import ws from '@/web-socket/web-socket';
import UserName from './user-name/user-name';
import LogOut from './nav-button/log-out';

export default class HeaderChat extends BaseElement {
  constructor() {
    super({ tag: 'header', className: ['chat-page__header', 'header'] });
    const name = new UserName();
    ws.attach(name);
    this.appendChildren(name, new Title('Fun Chat'), new LogOut());
  }
}
