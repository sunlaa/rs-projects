import BaseElement from '@/utils/components/base-element';
import Info from './info-button';
import LogOut from './log-out';

export default class NavButtons extends BaseElement {
  constructor() {
    super({ className: ['header__nav-buttons'] }, new Info(), new LogOut());
  }
}
