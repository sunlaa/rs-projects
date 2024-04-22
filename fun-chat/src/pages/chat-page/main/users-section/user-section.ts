import './user-section.css';
import BaseElement from '@/utils/components/base-element';
import backdrop from '@/utils/components/backdrop';
import { widthToHideUsers } from '@/utils/types/types';
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
    this.setStyles({ display: 'flex' });
  };

  hideFriends = () => {
    this.setStyles({ display: 'none' });
  };

  resize = () => {
    if (window.innerWidth > widthToHideUsers) {
      this.showFriends();
    } else {
      this.hideFriends();
      backdrop.hide();
    }
  };
}
