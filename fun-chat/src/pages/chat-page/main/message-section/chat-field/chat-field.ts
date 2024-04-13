import BaseElement from '@/utils/components/base-element';

export default class ChatField extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      className: ['message-section__chat-field'],
      textContent: 'Choose someone to talk',
    });
  }
}
