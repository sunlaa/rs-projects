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

  firstMessage: Title = new Title('Write your first message!', [
    'chat-field__title',
  ]);

  userItems: UserItem[] = [];

  unreadMessages: MessageElement[] = [];

  separator: MessageSeparator = new MessageSeparator();

  isFirstUnread: boolean = true;

  constructor() {
    super(
      {
        tag: 'div',
        classes: ['message-section__chat-field', 'chat-field'],
      },
      new Title('Choose someone to talk', ['chat-field__title'])
    );

    ws.socket.addEventListener('message', this.drawMessage);
    ws.socket.addEventListener('message', this.removeMessageCounter);

    this.addListener('click', this.changeStatus);
    this.addListener('wheel', this.changeStatus);
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

        if (this.separator.element.parentElement === this.element) {
          this.separator.element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          messageElement.element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }
      }

      const item = this.userItems.find((li) => li.login === message.from);
      if (item) {
        item.messageCounter.increment();
      }
    }
    if (data.type === 'MSG_FROM_USER' && data.id === 'get-specified-user') {
      this.removeChildren();
      this.unreadMessages = [];
      this.isFirstUnread = true;

      if (data.payload.messages.length === 0) {
        this.append(this.firstMessage);
      } else {
        data.payload.messages.forEach((messageData) => {
          this.appendMessage(messageData);
        });
      }

      if (this.separator.element.parentElement === this.element) {
        this.separator.element.scrollIntoView();
      } else {
        this.element.scrollTop = this.element.scrollHeight;
      }
    }
  };

  private appendMessage(message: Message) {
    this.firstMessage.remove();
    const messageElement = new MessageElement(message);
    messageElement.addStatus(message);

    this.append(messageElement);
    if (!message.status.isReaded) {
      this.addSeparator(messageElement);
      this.unreadMessages.push(messageElement);
    }
    return messageElement;
  }

  private addSeparator(message: MessageElement) {
    if (this.isFirstUnread && message.from === this.currentUser) {
      this.separator.add(this, message);
      this.isFirstUnread = false;
    }
  }

  removeMessageCounter = (event: MessageEvent) => {
    const data: ResponseReadStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_READ') {
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
    this.unreadMessages = [];
    this.separator.remove();
    this.isFirstUnread = true;
  };
}
