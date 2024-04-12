import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import ws, { WSocket } from '@/web-socket/web-socket';
import UsersList from './user-list';

export default class UsersSection extends BaseElement {
  list: UsersList;

  constructor() {
    super({ tag: 'aside', className: ['main__users-setcion', 'user-section'] });
    this.list = new UsersList();
    ws.attach(this);
    ws.attach(this.list);
    this.append(this.list);
  }

  update(socket: WSocket) {
    if (socket.authenticatedUsers && socket.unauthorizedUsers) {
      this.list.removeChildren();
      const authenticatedUsers = socket.authenticatedUsers.filter(
        (user) => user.login !== socket.user
      );
      // console.log(authenticatedUsers);
      this.list.fillAuthenticatedUsers(authenticatedUsers);
      this.list.fillUnauthorizedUsers(socket.unauthorizedUsers);
      socket.detach(this);
    }
  }
}
