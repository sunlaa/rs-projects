import Input from '@/utils/components/input';
import UsersList from '../users/user-list';

export default class SortInput extends Input {
  list: UsersList;

  constructor(list: UsersList) {
    super({
      classes: ['user-section__input', 'main-input'],
      type: 'text',
      placeholder: 'Search...',
    });

    this.list = list;
    this.addListener('input', this.sort);
  }

  sort = () => {
    const value = this.value.toLowerCase();
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
