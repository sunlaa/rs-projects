import BaseElement from '@/utils/components/base-element';
import { User } from '@/utils/types/types';
import { WSocket } from '@/web-socket/web-socket';

export default class UserPage extends BaseElement {
  allUsers: User[] = [];

  login: string;

  constructor(login: string) {
    super({});
    this.login = login;
  }

  update(ws: WSocket) {
    ws.users.forEach((user) => {
      this.allUsers.push(user);
    });
  }
}
