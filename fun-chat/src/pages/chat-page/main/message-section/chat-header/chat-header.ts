import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import { ResponseUserData } from '@/utils/types/types';
import ws from '@/web-socket/web-socket';

export default class MessageHeader extends BaseElement {
  login: string = '';

  constructor() {
    super({ classes: ['message-section__header'] });
    ws.socket.addEventListener('message', this.updateStatus);
  }

  addContent(status: string, login: string) {
    this.removeChildren();
    this.login = login;

    const userStatus = new Title(status, ['header__status']);
    const userLogin = new Title(login, ['header__login']);

    this.appendChildren(userLogin, userStatus);
  }

  updateStatus = (event: MessageEvent) => {
    const data: ResponseUserData = JSON.parse(event.data);
    if (
      data.type === 'USER_EXTERNAL_LOGIN' ||
      data.type === 'USER_EXTERNAL_LOGOUT'
    ) {
      const { user } = data.payload;
      if (user.login === this.login) {
        const status = user.isLogined ? 'online' : 'offline';
        this.addContent(status, user.login);
      }
    }
  };
}
