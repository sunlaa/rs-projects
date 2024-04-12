import BaseElement from '@/utils/components/base-element';

export default class MessageSection extends BaseElement {
  constructor() {
    super({ tag: 'article', className: ['main__message-section'] });
  }
}
