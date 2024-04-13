import './message-section.css';
import BaseElement from '@/utils/components/base-element';
import MessageHeader from './chat-header/chat-header';
import ChatForm from './chat-form/chat-form';
import ChatField from './chat-field/chat-field';

export default class MessageSection extends BaseElement {
  chatHeader: MessageHeader = new MessageHeader();

  constructor() {
    super({
      tag: 'article',
      className: ['main__message-section', 'message-section', 'section'],
    });
    this.addListener('open-chat', this.loadHistory);
    this.appendChildren(this.chatHeader, new ChatField(), new ChatForm());
  }

  loadHistory = (e: Event) => {
    const event = e as CustomEvent;
    const data = event.detail;
    this.chatHeader.addContent(data.status, data.login);
  };
}
