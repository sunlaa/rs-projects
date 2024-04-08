import BaseElement from '@/utils/components/base-element';
import { Subject } from '@/utils/types/types';

export default class UserPage extends BaseElement {
  allUsers: string[] = [];

  login: string;

  constructor(login: string) {
    super({});
    this.login = login;
  }

  update(ws: Subject) {
    ws.users.forEach((user) => {
      this.allUsers.push(user.login);
    });
    // console.log('in user', this.allUsers);
  }
}
