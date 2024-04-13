import ws, { WSocket } from '@/web-socket/web-socket';
import './chat-field.css';
import BaseElement from '@/utils/components/base-element';
import { Message } from '@/utils/types/types';
import MessageElement from './message-element/message-element';

export default class ChatField extends BaseElement {
  myMessage: Message | null = null;

  notMyMessage: Message | null = null;

  fetchedMessages: Message[] | null = null;

  constructor() {
    super({
      tag: 'div',
      classes: ['message-section__chat-field', 'chat-field'],
      textContent: 'Choose someone to talk',
    });
  }

  update(socket: WSocket) {
    const wSocket = socket;
    this.myMessage = wSocket.myMessage;
    this.notMyMessage = wSocket.notMyMessage;
    this.fetchedMessages = wSocket.fetchedMessages;

    if (this.myMessage) {
      const message = new MessageElement(
        ws.user,
        this.myMessage.datetime,
        this.myMessage.text,
        this.myMessage.id
      );

      message.statusFooter.changeDeliveryStatus(
        this.myMessage.status.isDelivered
      );
      this.append(message);
      this.element.scrollTop = this.element.scrollHeight;
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
      return;
    }

    if (this.fetchedMessages) {
      this.drawMessageHistory(this.fetchedMessages);
      wSocket.fetchedMessages = null;
    }
  }

  drawMessageHistory(messages: Message[]) {
    this.removeChildren();

    messages.forEach((data) => {
      const message = new MessageElement(
        data.from,
        data.datetime,
        data.text,
        data.id
      );

      if (data.from === ws.user)
        message.statusFooter.changeDeliveryStatus(
          data.status.isDelivered,
          data.status.isReaded
        );

      this.append(message);
    });
  }
}
