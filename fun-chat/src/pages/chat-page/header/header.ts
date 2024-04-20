import './header.css';
import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import UserName from './user-name/user-name';
import NavButtons from './nav-button/nav-buttons';

export default class HeaderChat extends BaseElement {
  constructor() {
    super({ tag: 'header', classes: ['chat-page__header', 'header'] });
    this.appendChildren(
      new BaseElement(
        { classes: ['header__user-data'] },
        new UserName(),
        new Title('Fun Chat', ['header__title'])
      ),
      new NavButtons()
    );
  }
}
