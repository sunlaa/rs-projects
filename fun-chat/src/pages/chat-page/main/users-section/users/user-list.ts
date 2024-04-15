import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';
import {
  ResponseAllUsersData,
  ResponseUserData,
  User,
} from '@/utils/types/types';
import UserItem from './user-item';

export default class UsersList extends BaseElement<HTMLUListElement> {
  userItems: UserItem[] = [];

  constructor() {
    super({ tag: 'ul', classes: ['users-section__list'] });

    ws.socket.addEventListener('message', this.allUsers);
    ws.socket.addEventListener('message', this.externalUser);
  }

  addUser(status: 'online' | 'offline', login: string) {
    ws.fetchMessages(login, 'initial-request');
    const li = new UserItem(status, login);
    if (status === 'offline') {
      this.append(li);
    } else {
      this.prepend(li);
    }
    this.userItems.push(li);
  }

  fillAuthenticatedUsers(users: User[]) {
    users.forEach((user) => {
      if (user.login !== ws.user) this.addUser('online', user.login);
    });
  }

  fillUnauthorizedUsers(users: User[]) {
    users.forEach((user) => {
      this.addUser('offline', user.login);
    });
  }

  findByName(name: string) {
    return this.userItems.find((li) => li.login === name);
  }

  allUsers = (event: MessageEvent) => {
    const data: ResponseAllUsersData = JSON.parse(event.data);

    if (data.type === 'USER_ACTIVE') {
      this.fillAuthenticatedUsers(data.payload.users);
    }
    if (data.type === 'USER_INACTIVE') {
      this.fillUnauthorizedUsers(data.payload.users);
    }
  };

  externalUser = (event: MessageEvent) => {
    const data: ResponseUserData = JSON.parse(event.data);

    if (
      data.type === 'USER_EXTERNAL_LOGIN' ||
      data.type === 'USER_EXTERNAL_LOGOUT'
    ) {
      const { login } = data.payload.user;
      const { isLogined } = data.payload.user;
      const prev = this.findByName(login);
      if (prev) {
        prev.changeStatus(this, isLogined);
      }
    }
  };
}
