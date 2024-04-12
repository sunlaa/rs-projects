import BaseElement from '@/utils/components/base-element';

export default class UserItem extends BaseElement<HTMLLIElement> {
  constructor(status: 'online' | 'offline', login: string) {
    super(
      { tag: 'li', className: ['user-section__item'] },
      new BaseElement({ className: ['indicator', `${status}`] }),
      new BaseElement({ textContent: login })
    );
  }
}
