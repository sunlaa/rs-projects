import { WSocket } from '@/web-socket/web-socket';
import './chat-field.css';
import BaseElement from '@/utils/components/base-element';
import { Message } from '@/utils/types/types';
import MessageElement from './message-element/message-element';

export default class ChatField extends BaseElement {
  myMessage: Message | null = null;

  notMyMessage: Message | null = null;

  constructor() {
    super({
      tag: 'div',
      classes: ['message-section__chat-field', 'chat-field'],
      textContent: 'Choose someone to talk',
    });
  }

  update(ws: WSocket) {
    const wSocket = ws;
    this.myMessage = wSocket.myMessage;
    this.notMyMessage = wSocket.notMyMessage;

    if (this.myMessage) {
      const message = new MessageElement(
        'You',
        this.myMessage.datetime,
        this.myMessage.text,
        this.myMessage.id
      );

      message.statusFooter.changeDeliveryStatus(
        this.myMessage.status.isDelivered
      );
      this.append(message);
      wSocket.myMessage = null;
      return;
    }

    if (this.notMyMessage) {
      const message = new MessageElement(
        this.notMyMessage.from,
        this.notMyMessage.datetime,
        this.notMyMessage.text,
        this.notMyMessage.id
      );

      this.append(message);
      wSocket.notMyMessage = null;
    }
  }
}
