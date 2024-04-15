import BaseElement from '@/utils/components/base-element';
import { Message, ResponseAllMessagesData } from '@/utils/types/types';
import ws from '@/web-socket/web-socket';

export default class UserItem extends BaseElement<HTMLLIElement> {
  status: 'online' | 'offline';

  login: string;

  indicator: BaseElement;

  messageCounter: BaseElement;

  counter: number = 0;

  constructor(status: 'online' | 'offline', login: string) {
    super({ tag: 'li', classes: ['user-section__item', 'item'] });

    this.indicator = new BaseElement({
      classes: ['item__indicator', `${status}`],
    });

    const nameStatus = new BaseElement(
      { classes: ['item__name-status'] },
      new BaseElement({ textContent: login }),
      this.indicator
    );
    this.messageCounter = new BaseElement({
      classes: ['item__message-counter', 'invisible'],
      textContent: '1',
    });
    this.status = status;
    this.login = login;

    this.addListener('click', this.openChat);
    this.appendChildren(nameStatus, this.messageCounter);

    ws.socket.addEventListener('message', this.setCounter);
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

  incrementMessageCounter() {
    this.counter += 1;
    this.messageCounter.setContent(`${this.counter}`);
    this.messageCounter.removeClass('invisible');
  }

  resetMessageCounter() {
    this.counter = 0;
    this.messageCounter.addClass('invisible');
  }

  setCounter = (event: MessageEvent) => {
    const data: ResponseAllMessagesData = JSON.parse(event.data);

    if (data.type === 'MSG_FROM_USER' && data.id === 'initial-request') {
      const count = this.getUnreadCount(data.payload.messages);

      if (count !== 0) {
        this.counter = count;
        this.messageCounter.setContent(`${count}`);
        this.messageCounter.removeClass('invisible');
      }
    }
  };

  getUnreadCount(messages: Message[]) {
    let count = 0;

    messages.forEach((message) => {
      if (!message.status.isReaded && message.from === this.login) {
        count += 1;
      }
    });
    return count;
  }
}
