import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';
import UsersList from './users/user-list';
import SortInput from './sorting/sort-input';

export default class UsersSection extends BaseElement {
  constructor() {
    super({ tag: 'aside', className: ['main__users-section', 'user-section'] });
    const list = new UsersList();
    ws.attach(list);
    this.appendChildren(new SortInput(list), list);
  }
}
