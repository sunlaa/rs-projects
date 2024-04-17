import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import UsersList from './users/user-list';
import SortWrapper from './sorting/sort-wrapper';

export default class UsersSection extends BaseElement {
  list: UsersList;

  constructor() {
    super({
      tag: 'aside',
      classes: ['main__users-section', 'user-section', 'section'],
    });
    this.list = new UsersList();
    this.appendChildren(new SortWrapper(this, this.list), this.list);
    this.addListener('show-friends', this.showFriends);
  }

  showFriends = () => {
    this.setStyles({ display: 'block' });
  };
}
