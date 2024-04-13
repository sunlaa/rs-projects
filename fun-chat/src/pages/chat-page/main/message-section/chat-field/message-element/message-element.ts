import BaseElement from '@/utils/components/base-element';
import MessageStatus from './status';

export default class MessageElement extends BaseElement {
  statusFooter: MessageStatus;

  constructor(from: string, dateTime: number, text: string, id: string) {
    super({ classes: ['chat-field__message', 'message', 'section'], id });

    if (from === 'You') {
      this.addClass('mine');
    } else {
      this.addClass('not-mine');
    }

    this.statusFooter = new MessageStatus();

    this.createMessage(from, dateTime, text);

    this.append(this.statusFooter);
  }

  createMessage(from: string, dateTime: number, text: string) {
    const time = Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(new Date(dateTime));

    const header = new BaseElement(
      { classes: ['message__header'] },
      new BaseElement({ textContent: from }),
      new BaseElement({ textContent: time })
    );

    const messageText = new BaseElement({
      classes: ['message__text'],
      textContent: text,
    });

    this.appendChildren(header, messageText);
  }
}
