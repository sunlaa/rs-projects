import BaseElement from '@/utils/components/base-element';

export default class MessageSeparator extends BaseElement {
  constructor() {
    super({ classes: ['chat-field__separator'], textContent: 'Unread' });
  }
}
