import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';

export default class MessageHeader extends BaseElement {
  constructor() {
    super({ tag: 'head', className: ['message-section__header'] });
  }

  addContent(status: string, login: string) {
    const userStatus = new Title(status, ['']);
    const userLogin = new Title(login, ['']);
    this.appendChildren(userStatus, userLogin);
  }
}
