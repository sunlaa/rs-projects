import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';
import UsersList from './user-list';

export default class UsersSection extends BaseElement {
  list: UsersList;

  constructor() {
    super({ tag: 'aside', className: ['main__users-setcion', 'user-section'] });
    this.list = new UsersList();
    ws.attach(this.list);
    this.append(this.list);
  }
}
