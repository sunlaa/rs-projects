import ws from '@/web-socket/web-socket';
import './chat-field.css';
import BaseElement from '@/utils/components/base-element';
import Title from '@/utils/components/title';
import {
  Message,
  ResponseAllMessagesData,
  ResponseMessageData,
  ResponseReadStatusData,
} from '@/utils/types/types';
import MessageElement from './message-element/message-element';
import UserItem from '../../users-section/users/user-item/user-item';
import MessageSeparator from './message-element/separator';

export default class ChatField extends BaseElement {
  currentUser: string = '';

  userItems: UserItem[] = [];

  unreadMessages: MessageElement[] = [];

  constructor() {
    super(
      {
        tag: 'div',
        classes: ['message-section__chat-field', 'chat-field'],
      },
      new Title('Choose someone to talk', ['chat-field__title'])
    );

    ws.socket.addEventListener('message', this.drawMessage);
    ws.socket.addEventListener('message', this.markAsRead);

    this.addListener('click', this.changeStatus);
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
        messageElement.addStatus(message);
        this.unreadMessages.push(messageElement);

        this.append(messageElement);
        messageElement.getElement().scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      const item = this.userItems.find((li) => li.login === message.from);

      if (item) {
        item.messageCounter.increment();
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
      message.addStatus(data);

      this.append(message);
      if (!data.status.isReaded) this.unreadMessages.push(message);
    });
    this.element.scrollTop = this.element.scrollHeight;
  }

  markAsRead = (event: MessageEvent) => {
    const data: ResponseReadStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_READ') {
      this.unreadMessages.forEach((message) => {
        if (message.from === ws.user) {
          message.statusFooter.changeStatus(
            true,
            data.payload.message.status.isReaded
          );
        }
      });

      const item = this.userItems.find((li) => li.login === this.currentUser);
      if (item) {
        item.messageCounter.reset();
      }

      this.unreadMessages = [];
    }
  };

  changeStatus = () => {
    this.unreadMessages.forEach((message) => {
      ws.changeReadStatus(message.id);
    });
  };

  addSeparator(message: MessageElement) {
    const messageElement = message.getElement();
    this.element.insertBefore(new MessageSeparator().element, messageElement);
  }
}
