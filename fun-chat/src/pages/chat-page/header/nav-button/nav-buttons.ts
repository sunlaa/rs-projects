import BaseElement from '@/utils/components/base-element';
import Info from './info-button';
import LogOut from './log-out';

export default class NavButtons extends BaseElement {
  constructor() {
    super({ classes: ['header__nav-buttons'] }, new Info(), new LogOut());
  }
}
