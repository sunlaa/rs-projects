import BaseElement from '@/utils/components/base-element';
import MessageCounter from './message-counter';

export default class UserItem extends BaseElement<HTMLLIElement> {
  status: 'online' | 'offline';

  login: string;

  indicator: BaseElement;

  messageCounter: MessageCounter;

  constructor(status: 'online' | 'offline', login: string) {
    super({ tag: 'li', classes: ['user-section__item', 'item'] });

    this.status = status;
    this.login = login;

    this.indicator = new BaseElement({
      classes: ['item__indicator', `${status}`],
    });

    const loginStatus = new BaseElement(
      { classes: ['item__name-status'] },
      this.indicator,
      new BaseElement({ classes: ['item__name'], textContent: login })
    );

    this.messageCounter = new MessageCounter(login);

    this.addListener('click', this.openChat);
    this.appendChildren(loginStatus, this.messageCounter);
  }

  openChat = () => {
    const messageSection = document.querySelector('.message-section');
    if (messageSection) {
      messageSection.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { status: this.status, login: this.login },
        })
      );
    }
  };

  changeStatus(container: BaseElement, isLogined: boolean) {
    if (isLogined) {
      this.indicator.removeClass('offline');
      this.indicator.addClass('online');
      container.prepend(this);
    } else {
      this.indicator.removeClass('online');
      this.indicator.addClass('offline');
      container.append(this);
    }
  }
}
