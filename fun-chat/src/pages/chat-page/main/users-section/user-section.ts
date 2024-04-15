import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import UsersList from './users/user-list';
import SortInput from './sorting/sort-input';

export default class UsersSection extends BaseElement {
  list: UsersList;

  constructor() {
    super({
      tag: 'aside',
      classes: ['main__users-section', 'user-section', 'section'],
    });
    this.list = new UsersList();
    // ws.attach(this.list);
    this.appendChildren(new SortInput(this.list), this.list);
  }
}
