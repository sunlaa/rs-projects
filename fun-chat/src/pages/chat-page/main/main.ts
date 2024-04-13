import './main.css';
import BaseElement from '@/utils/components/base-element';
import UsersSection from './users-section/user-section';
import MessageSection from './message-section/message-section';

export default class MainChat extends BaseElement {
  constructor() {
    super({ tag: 'main', className: ['chat-page__main', 'main'] });

    const userSection = new UsersSection();
    const messageSection = new MessageSection();
    userSection.list.messageSection = messageSection;

    this.appendChildren(userSection, messageSection);
  }
}
