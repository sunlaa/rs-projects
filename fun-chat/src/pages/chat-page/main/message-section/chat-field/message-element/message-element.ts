import BaseElement from '@/utils/components/base-element';
import { Message } from '@/utils/types/types';
import ws from '@/web-socket/web-socket';
import MessageStatus from './status';

export default class MessageElement extends BaseElement {
  statusFooter: MessageStatus;

  constructor(message: Message) {
    super({
      classes: ['chat-field__message', 'message', 'section'],
      id: message.id,
    });

    if (message.from === ws.user) {
      this.addClass('mine');
    } else {
      this.addClass('not-mine');
    }

    this.statusFooter = new MessageStatus();

    this.createMessage(message);

    this.append(this.statusFooter);
  }

  createMessage(message: Message) {
    const time = Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(new Date(message.datetime));

    const header = new BaseElement(
      { classes: ['message__header'] },
      new BaseElement({ textContent: message.from }),
      new BaseElement({ textContent: time })
    );

    const messageText = new BaseElement({
      classes: ['message__text'],
      textContent: message.text,
    });

    this.appendChildren(header, messageText);
  }
}
