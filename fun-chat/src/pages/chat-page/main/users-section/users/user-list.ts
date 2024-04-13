import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';
import { User } from '@/utils/types/types';
import UserItem from './user-item';
import MessageSection from '../../message-section/message-section';

export default class UsersList extends BaseElement<HTMLUListElement> {
  messageSection: MessageSection | null = null;

  constructor() {
    super({ tag: 'ul', classes: ['users-section__list'] });

    ws.socket.addEventListener('message', this.allUsers);
    ws.socket.addEventListener('message', this.externalUser);
  }

  addUser(status: 'online' | 'offline', login: string) {
    const li = new UserItem(status, login);
    li.messageSection = this.messageSection;
    if (status === 'offline') {
      this.append(li);
    } else {
      this.prepend(li);
    }
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
    const usersArr = this.getChildren();
    return usersArr.find((elem) => elem.textContent === name);
  }

  allUsers = (event: MessageEvent) => {
    const data: {
      id: string;
      type: string;
      payload: {
        users: User[];
      };
    } = JSON.parse(event.data);

    if (data.type === 'USER_ACTIVE') {
      this.fillAuthenticatedUsers(data.payload.users);
    }
    if (data.type === 'USER_INACTIVE') {
      this.fillUnauthorizedUsers(data.payload.users);
    }
  };

  externalUser = (event: MessageEvent) => {
    const data: {
      id: string;
      type: string;
      payload: {
        user: User;
      };
    } = JSON.parse(event.data);

    if (
      data.type === 'USER_EXTERNAL_LOGIN' ||
      data.type === 'USER_EXTERNAL_LOGOUT'
    ) {
      const { login } = data.payload.user;
      const { isLogined } = data.payload.user;
      const prev = this.findByName(login);
      if (prev) {
        prev.remove();
      }
      if (isLogined) {
        this.addUser('online', login);
      } else {
        this.addUser('offline', login);
      }
    }
  };
}
