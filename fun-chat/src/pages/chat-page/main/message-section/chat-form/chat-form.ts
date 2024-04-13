import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import ws from '@/web-socket/web-socket';

export default class ChatForm extends BaseElement<HTMLFormElement> {
  messageField: Input = new Input({
    classes: ['chat-form__field', 'main-input'],
    type: 'text',
    placeholder: 'Your message...',
  });

  sendButton: Input = new Input({
    classes: ['chat-form__submit', 'button'],
    type: 'submit',
    value: 'Send',
  });

  to: string = '';

  constructor() {
    super({
      tag: 'form',
      classes: ['message-section__chat-form', 'chat-form'],
    });
    this.appendChildren(this.messageField, this.sendButton);
    this.addListener('submit', this.sendMessage);
  }

  sendMessage = (event: Event) => {
    event.preventDefault();
    const text = this.messageField.getData();
    ws.sendMessage(this.to, text);
    this.messageField.clear();
  };
}
