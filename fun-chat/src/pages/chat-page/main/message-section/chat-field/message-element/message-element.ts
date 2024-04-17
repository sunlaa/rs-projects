import BaseElement from '@/utils/components/base-element';
import {
  Message,
  ResponseDeleteMessageData,
  ResponseDeliveredStatusData,
  ResponseEditStatusData,
  ResponseReadStatusData,
} from '@/utils/types/types';
import ws from '@/web-socket/web-socket';
import MessageStatus from './status';
import actionMenu from './action-menu';

export default class MessageElement extends BaseElement {
  statusFooter: MessageStatus;

  id: string;

  from: string;

  isRead: boolean;

  messageText: BaseElement;

  constructor(message: Message) {
    super({
      classes: ['chat-field__message', 'message'],
    });

    this.id = message.id;

    this.from = message.from;

    this.isRead = message.status.isReaded;

    if (this.from === ws.user) {
      this.addClass('mine');
    } else {
      this.addClass('not-mine');
    }

    this.messageText = new BaseElement({
      classes: ['message__text'],
      textContent: message.text,
    });

    this.statusFooter = new MessageStatus();

    this.createMessage(message);

    this.append(this.statusFooter);

    this.addListener('contextmenu', this.showActionMenu);

    ws.socket.addEventListener('message', this.updateDeliveryStatus);
    ws.socket.addEventListener('message', this.updateReadStatus);
    ws.socket.addEventListener('message', this.updateEditStatus);
    ws.socket.addEventListener('message', this.deleteMessage);
  }

  createMessage(message: Message) {
    const time = Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(new Date(message.datetime));
    const from = this.from === ws.user ? 'You' : this.from;

    const header = new BaseElement(
      { classes: ['message__header'] },
      new BaseElement({ textContent: from }),
      new BaseElement({ textContent: time })
    );

    this.appendChildren(header, this.messageText);
  }

  updateDeliveryStatus = (event: MessageEvent) => {
    const data: ResponseDeliveredStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_DELIVER' && data.payload.message.id === this.id) {
      this.statusFooter.changeStatus(data.payload.message.status.isDelivered);
    }
  };

  updateReadStatus = (event: MessageEvent) => {
    const data: ResponseReadStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_READ') {
      if (this.id === data.payload.message.id && this.from === ws.user) {
        this.isRead = true;
        this.statusFooter.changeStatus(true, true);
      }
    }
  };

  updateEditStatus = (event: MessageEvent) => {
    const data: ResponseEditStatusData = JSON.parse(event.data);

    if (data.type === 'MSG_EDIT') {
      if (this.id === data.payload.message.id) {
        this.messageText.setContent(data.payload.message.text);
        this.statusFooter.changeEditStatus(
          data.payload.message.status.isEdited
        );
      }
    }
  };

  deleteMessage = (event: MessageEvent) => {
    const data: ResponseDeleteMessageData = JSON.parse(event.data);

    if (data.type === 'MSG_DELETE') {
      if (this.id === data.payload.message.id) {
        this.remove();
      }
    }
  };

  showActionMenu = (event: Event) => {
    event.preventDefault();

    if (this.from === ws.user) {
      actionMenu.id = this.id;
      actionMenu.text = this.messageText.content;

      this.append(actionMenu);
    }
  };

  addStatus(data: Message) {
    if (data.from === ws.user)
      this.statusFooter.changeStatus(
        data.status.isDelivered,
        data.status.isReaded
      );

    this.statusFooter.changeEditStatus(data.status.isEdited);
  }
}
