import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import ws from '@/web-socket/web-socket';
import ChatField from '../chat-field/chat-field';

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

  isEdit: boolean = false;

  messageId: string = '';

  chatField: ChatField | null = null;

  constructor() {
    super({
      tag: 'form',
      classes: ['message-section__chat-form', 'chat-form'],
    });

    this.disable();

    this.appendChildren(this.messageField, this.sendButton);
    this.addListener('submit', this.sendMessage);
    this.addListener('edit', this.editMessage);
  }

  sendMessage = (event: Event) => {
    event.preventDefault();
    if (!this.chatField) throw new Error('No chat field!');

    const text = this.messageField.value;

    if (text.length !== 0 && !this.isEdit) {
      ws.sendMessage(this.to, text);
      this.messageField.clear();

      this.chatField.separator.remove();
      this.chatField.changeStatus();
    } else if (this.isEdit) {
      if (text.length !== 0) {
        ws.editMessage(this.messageId, this.messageField.value);
      }

      this.isEdit = false;
      this.sendButton.value = 'Send';
      this.messageField.clear();
    }
  };

  editMessage = (event: Event) => {
    const customEvent = event as CustomEvent;
    const messageText = customEvent.detail.text;
    this.messageId = customEvent.detail.id;

    this.messageField.value = messageText;
    this.messageField.focus();
    this.sendButton.value = 'Edit';
    this.isEdit = true;
  };

  disable() {
    this.messageField.off();
    this.sendButton.off();
  }

  enable() {
    this.messageField.on();
    this.sendButton.on();
  }
}
