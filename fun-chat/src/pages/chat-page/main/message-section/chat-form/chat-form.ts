import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';

export default class ChatForm extends BaseElement<HTMLFormElement> {
  messageField: Input = new Input({
    className: ['chat-form__field', 'main-input'],
    type: 'text',
    placeholder: 'Your message...',
  });

  sendButton: Input = new Input({
    className: ['chat-form__submit', 'button'],
    type: 'submit',
    value: 'Send',
  });

  constructor() {
    super({ className: ['message-section__chat-form', 'chat-form'] });
    this.appendChildren(this.messageField, this.sendButton);
  }
}
