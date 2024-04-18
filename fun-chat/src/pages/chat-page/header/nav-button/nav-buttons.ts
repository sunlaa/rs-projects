import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';
import Info from './info-button';
import LogOut from './log-out';
import Friends from './friends-button';

export default class NavButtons extends BaseElement {
  constructor(router: Router) {
    super(
      { classes: ['header__nav-buttons'] },
      new Friends(),
      new Info(router, 'chat'),
      new LogOut()
    );
  }
}
