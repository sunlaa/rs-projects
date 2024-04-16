import BaseElement from '@/utils/components/base-element';
import MessageElement from './message-element';

export default class MessageSeparator extends BaseElement {
  isFirst: boolean = true;

  constructor() {
    super({
      classes: ['chat-field__separator'],
      textContent: 'Unread messages',
    });
  }

  add(chatField: BaseElement, message: MessageElement) {
    chatField.element.insertBefore(this.element, message.element);
  }
}
