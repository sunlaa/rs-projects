import BaseElement from '@/utils/components/base-element';
import UsersSection from './users-section/user-section';
import MessageSection from './message-section/message-section';

export default class MainChat extends BaseElement {
  constructor() {
    super(
      { tag: 'main', className: ['chat-page__main', 'main'] },
      new UsersSection(),
      new MessageSection()
    );
  }
}
