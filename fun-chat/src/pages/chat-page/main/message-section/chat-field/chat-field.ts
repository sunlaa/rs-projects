import ws from '@/web-socket/web-socket';
import './chat-field.css';
import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import { Message } from '@/utils/types/types';
import MessageElement from './message-element/message-element';

export default class ChatField extends BaseElement {
  currentUser: string = '';

  constructor() {
    super(
      {
        tag: 'div',
        classes: ['message-section__chat-field', 'chat-field'],
      },
      new Title('Choose someone to talk', ['chat-field__title'])
    );

    ws.socket.addEventListener('message', this.drawMessage);
  }

  drawMessage = (event: MessageEvent) => {
    const data: {
      id: string;
      type: string;
      payload: {
        message: Message;
        messages: Message[];
      };
    } = JSON.parse(event.data);

    const { message } = data.payload;

    if (data.type === 'MSG_SEND') {
      if (
        this.currentUser === message.to ||
        this.currentUser === message.from
      ) {
        this.append(new MessageElement(message));
        this.element.scrollTop = this.element.scrollHeight;
      }
    }
    if (data.type === 'MSG_FROM_USER') {
      this.drawMessageHistory(data.payload.messages);
    }
  };

  drawMessageHistory(messages: Message[]) {
    this.removeChildren();

    messages.forEach((data) => {
      const message = new MessageElement(data);

      if (data.from === ws.user)
        message.statusFooter.changeDeliveryStatus(
          data.status.isDelivered,
          data.status.isReaded
        );

      this.append(message);
    });
    this.element.scrollTop = this.element.scrollHeight;
  }
}
