import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';

export default class ReturnButton extends BaseElement<HTMLAnchorElement> {
  prev: string;

  constructor(prev: string) {
    super({
      tag: 'a',
      textContent: 'Return',
      classes: ['info-page__return', 'button'],
      href: `#${prev}`,
    });

    this.prev = prev;

    this.addListener('click', this.back);
  }

  back = () => {
    if (this.prev === 'chat') ws.getAllUsers();
  };
}
