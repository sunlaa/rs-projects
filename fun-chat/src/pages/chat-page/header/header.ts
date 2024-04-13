import './header.css';
import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import ws from '@/web-socket/web-socket';
import UserName from './user-name/user-name';
import NavButtons from './nav-button/nav-buttons';

export default class HeaderChat extends BaseElement {
  constructor() {
    super({ tag: 'header', classes: ['chat-page__header', 'header'] });
    const name = new UserName();
    ws.attach(name);
    this.appendChildren(
      name,
      new Title('Fun Chat', ['header__title']),
      new NavButtons()
    );
  }
}
