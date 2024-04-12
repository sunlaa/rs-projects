import BaseElement from '@/utils/components/base-element';
import { WSocket } from '@/web-socket/web-socket';
import { User } from '@/utils/types/types';
import UserItem from './user-item';

export default class UsersList extends BaseElement<HTMLUListElement> {
  constructor() {
    super({ tag: 'ul', className: ['users-section__list'] });
  }

  addUser(status: 'online' | 'offline', login: string) {
    const li = new UserItem(status, login);
    if (status === 'offline') {
      this.append(li);
    } else {
      this.prepend(li);
    }
  }

  fillAuthenticatedUsers(users: User[]) {
    users.forEach((user) => {
      this.addUser('online', user.login);
    });
  }

  fillUnauthorizedUsers(users: User[]) {
    users.forEach((user) => {
      this.addUser('offline', user.login);
    });
  }

  findByName(name: string) {
    const usersArr = this.getChildren();
    return usersArr.find((elem) => elem.textContent === name);
  }

  update(ws: WSocket) {
    const wSocket = ws;
    if (ws.externalUser) {
      const status = ws.externalUser.isLogined ? 'online' : 'offline';
      const { login } = ws.externalUser;
      this.findByName(login)?.remove();
      this.addUser(status, login);
      wSocket.externalUser = null;
      return;
    }
    if (ws.authenticatedUsers && ws.unauthorizedUsers) {
      this.removeChildren();
      const authenticatedUsers = ws.authenticatedUsers.filter(
        (user) => user.login !== ws.user
      );
      this.fillAuthenticatedUsers(authenticatedUsers);
      this.fillUnauthorizedUsers(ws.unauthorizedUsers);
      wSocket.authenticatedUsers = null;
      wSocket.unauthorizedUsers = null;
    }
  }
}
