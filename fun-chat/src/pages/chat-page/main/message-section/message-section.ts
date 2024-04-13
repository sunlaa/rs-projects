import BaseElement from '@/utils/components/base-element';
import MessageHeader from './chat-header/chat-header';
import ChatForm from './chat-form/chat-form';

export default class MessageSection extends BaseElement {
  chatHeader: MessageHeader = new MessageHeader();

  constructor() {
    super({
      tag: 'article',
      className: ['main__message-section', 'message-section'],
    });
    this.addListener('open-chat', this.loadHistory);
    this.appendChildren(this.chatHeader, new ChatForm());
  }

  loadHistory = (e: Event) => {
    const event = e as CustomEvent;
    const data = event.detail;
    this.chatHeader.addContent(data.status, data.login);
  };
}
