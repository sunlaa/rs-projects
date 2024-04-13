import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';

export default class MessageHeader extends BaseElement {
  constructor() {
    super({ tag: 'head', className: ['message-section__header', 'header'] });
  }

  addContent(status: string, login: string) {
    this.removeChildren();
    const userStatus = new Title(status, ['header__status']);
    const userLogin = new Title(login, ['header__login']);
    this.appendChildren(userLogin, userStatus);
  }
}
