import BaseElement from '@/utils/components/base-element';

export default class ChatPage extends BaseElement {
  constructor() {
    super({
      tag: 'section',
      textContent: 'Chaaaaat!',
      styles: { textAlign: 'center' },
    });
  }
}
