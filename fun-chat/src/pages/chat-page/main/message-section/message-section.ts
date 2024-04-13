import './message-section.css';
import BaseElement from '@/utils/components/base-element';
import ws from '@/web-socket/web-socket';
import MessageHeader from './chat-header/chat-header';
import ChatForm from './chat-form/chat-form';
import ChatField from './chat-field/chat-field';

export default class MessageSection extends BaseElement {
  chatHeader: MessageHeader = new MessageHeader();

  chatField: ChatField = new ChatField();

  chatForm: ChatForm = new ChatForm();

  constructor() {
    super({
      tag: 'article',
      classes: ['main__message-section', 'message-section', 'section'],
    });
    this.addListener('open-chat', this.loadHistory);

    ws.attach(this.chatField);
    this.appendChildren(this.chatHeader, this.chatField, this.chatForm);
  }

  loadHistory = (e: Event) => {
    const event = e as CustomEvent;
    const data = event.detail;
    this.chatForm.to = data.login;
    this.chatHeader.addContent(data.status, data.login);
    ws.fetchMessages(data.login);
    this.chatForm.enable();
  };
}
