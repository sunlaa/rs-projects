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

  separator: MessageSeparator = new MessageSeparator();

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
    this.addListener('scroll', this.changeStatus);
  }

  appendMessage(message: Message) {
    const messageElement = new MessageElement(message);
    messageElement.addStatus(message);

    this.append(messageElement);
    this.addSeparator(messageElement);
    if (!message.status.isReaded) this.unreadMessages.push(messageElement);
    return messageElement;
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
        const messageElement = this.appendMessage(message);

        messageElement.element.scrollIntoView({
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
    this.unreadMessages = [];

    messages.forEach((message) => {
      this.appendMessage(message);
    });
    this.element.scrollTop = this.element.scrollHeight;
  }

  markAsRead = (event: MessageEvent) => {
    const data: ResponseReadStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_READ') {
      const messageToRead = this.unreadMessages.find(
        (message) => message.id === data.payload.message.id
      );
      if (messageToRead && messageToRead.from === ws.user) {
        messageToRead.updateReadStatus();

        this.unreadMessages = this.unreadMessages.filter(
          (message) => message.id !== messageToRead.id
        );
      }

      const item = this.userItems.find((li) => li.login === this.currentUser);
      if (item) {
        item.messageCounter.reset();
      }
    }
  };

  changeStatus = () => {
    this.unreadMessages.forEach((message) => {
      ws.changeReadStatus(message.id);
    });
    this.separator.remove();
  };

  private addSeparator(message: MessageElement) {
    console.log(this.unreadMessages.length, this.unreadMessages);
    if (this.unreadMessages.length === 0 && message.from === this.currentUser) {
      this.separator.add(this, message);
    }
  }
}
