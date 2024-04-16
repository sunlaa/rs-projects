import Input from '@/utils/components/input';
import BaseElement from '@/utils/components/base-element';
import UsersList from '../users/user-list';

export default class SortInput extends Input {
  list: UsersList;

  closeCross: BaseElement;

  constructor(list: UsersList, section: BaseElement) {
    super({
      classes: ['user-section__input', 'main-input'],
      type: 'text',
      placeholder: 'Search...',
    });

    this.closeCross = new BaseElement({ classes: ['user-section__close'] });
    this.closeCross.addListener('click', () => {
      section.setStyles({ display: 'none' });
    });

    this.list = list;
    this.append(this.closeCross); /// переделать на отдельный див!
    this.addListener('input', this.sort);
    window.addEventListener('resize', this.crossVisibility);
  }

  crossVisibility = () => {
    if (window.innerWidth <= 500) {
      this.showCross();
    } else {
      this.hideCross();
    }
  };

  showCross() {
    this.closeCross.setStyles({ display: 'block' });
  }

  hideCross() {
    this.closeCross.setStyles({ display: 'none' });
  }

  sort = () => {
    const value = this.getData().toLowerCase();
    const childs = this.list.getChildren();
    childs.forEach((li) => {
      const name = li.textContent?.toLowerCase();
      if (!name?.includes(value)) {
        li.classList.add('invisible');
      } else {
        li.classList.remove('invisible');
      }
    });
  };
}
