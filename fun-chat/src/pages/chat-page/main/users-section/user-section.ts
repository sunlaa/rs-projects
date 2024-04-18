import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import backdrop from '@/utils/components/backdrop';

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
    window.addEventListener('resize', this.resize);
  }

  showFriends = () => {
    this.setStyles({ display: 'block' });
  };

  hideFriends = () => {
    this.setStyles({ display: 'none' });
  };

  resize = () => {
    if (window.innerWidth > 500) {
      this.showFriends();
    } else {
      this.hideFriends();
      backdrop.hide();
    }
  };
}
