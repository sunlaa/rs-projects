import BaseElement from '@/utils/components/base-element';
import { Message, ResponseAllMessagesData } from '@/utils/types/types';
import ws from '@/web-socket/web-socket';

export default class MessageCounter extends BaseElement {
  counter: number = 0;

  login: string;

  constructor(login: string) {
    super({
      classes: ['item__message-counter', 'invisible'],
    });

    this.login = login;

    ws.socket.addEventListener('message', this.setCounter);
  }

  increse() {
    this.counter += 1;
    this.setContent(`${this.counter}`);
    this.removeClass('invisible');
  }

  decrese() {
    this.counter -= 1;
    if (this.counter > 0) {
      this.setContent(`${this.counter}`);
    } else {
      this.addClass('invisible');
    }
  }

  reset() {
    this.counter = 0;
    this.addClass('invisible');
  }

  setCounter = (event: MessageEvent) => {
    const data: ResponseAllMessagesData = JSON.parse(event.data);

    if (data.type === 'MSG_FROM_USER' && data.id === 'initial-request') {
      const count = this.getUnreadCount(data.payload.messages);

      if (count !== 0) {
        this.counter = count;
        this.setContent(`${count}`);
        this.removeClass('invisible');
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
