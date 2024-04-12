import BaseElement from '@/utils/components/base-element';

export default class UserItem extends BaseElement<HTMLLIElement> {
  constructor(status: 'online' | 'offline', login: string) {
    super(
      { tag: 'li' },
      new BaseElement({ className: ['indicator', `${status}`] }),
      new BaseElement({ tag: 'label', textContent: login })
    );
  }
}
