import ws from '@/web-socket/web-socket';
import './chat-field.css';
import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import {
  Message,
  ResponseAllMessagesData,
  ResponseMessageData,
} from '@/utils/types/types';
import MessageElement from './message-element/message-element';
import UserItem from '../../users-section/users/user-item';

export default class ChatField extends BaseElement {
  currentUser: string = '';

  userItems: UserItem[] = [];

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

  static addStatus(messageData: Message, message: MessageElement) {
    if (messageData.from === ws.user)
      message.statusFooter.changeDeliveryStatus(
        messageData.status.isDelivered,
        messageData.status.isReaded
      );
  }

  drawMessage = (event: MessageEvent) => {
    const data: ResponseMessageData & ResponseAllMessagesData = JSON.parse(
      event.data
    );

    const { message } = data.payload;

    if (data.type === 'MSG_SEND') {
      if (
        this.currentUser === message.to ||
        this.currentUser === message.from
      ) {
        const messageElement = new MessageElement(message);
        ChatField.addStatus(message, messageElement);

        this.append(messageElement);
        this.element.scrollTop = this.element.scrollHeight;
      }
      const item = this.userItems.find((li) => li.login === message.from);

      if (item) {
        item.incrementMessageCounter();
      }
    }
    if (data.type === 'MSG_FROM_USER' && data.id === 'get-specified-user') {
      this.drawMessageHistory(data.payload.messages);
    }
  };

  drawMessageHistory(messages: Message[]) {
    this.removeChildren();

    messages.forEach((data) => {
      const message = new MessageElement(data);

      ChatField.addStatus(data, message);

      this.append(message);
    });
    this.element.scrollTop = this.element.scrollHeight;
  }
}
