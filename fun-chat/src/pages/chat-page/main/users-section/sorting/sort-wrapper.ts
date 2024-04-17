import BaseElement from '@/utils/components/base-element';
import backdrop from '@/utils/components/backdrop';
import SortInput from './sort-input';
import UsersList from '../users/user-list';

export default class SortWrapper extends BaseElement {
  closeCross: BaseElement;

  constructor(section: BaseElement, list: UsersList) {
    super({ classes: ['user-section__sort-div'] }, new SortInput(list));

    this.closeCross = new BaseElement({ classes: ['user-section__close'] });
    this.closeCross.addListener('click', () => {
      section.setStyles({ display: 'none' });
      backdrop.hide();
    });

    this.append(this.closeCross);
    window.addEventListener('resize', this.crossVisibility);
  }

  showCross() {
    this.closeCross.setStyles({ display: 'block' });
  }

  hideCross() {
    this.closeCross.setStyles({ display: 'none' });
  }

  crossVisibility = () => {
    if (window.innerWidth <= 500) {
      this.showCross();
    } else {
      this.hideCross();
    }
  };
}
