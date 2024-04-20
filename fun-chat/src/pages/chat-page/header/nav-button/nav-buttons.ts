import BaseElement from '@/utils/components/base-element';
import Info from './info-button';
import LogOut from './log-out';
import Friends from './friends-button';

export default class NavButtons extends BaseElement {
  constructor() {
    super(
      { classes: ['header__nav-buttons'] },
      new Friends(),
      new Info(),
      new LogOut()
    );
  }
}
