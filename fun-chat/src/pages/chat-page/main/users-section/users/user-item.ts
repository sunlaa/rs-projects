import BaseElement from '@/utils/components/base-element';
import MessageSection from '../../message-section/message-section';

export default class UserItem extends BaseElement<HTMLLIElement> {
  messageSection: MessageSection | null = null;

  status: 'online' | 'offline';

  login: string;

  constructor(status: 'online' | 'offline', login: string) {
    super(
      { tag: 'li', className: ['user-section__item'] },
      new BaseElement({ className: ['indicator', `${status}`] }),
      new BaseElement({ textContent: login })
    );
    this.status = status;
    this.login = login;

    this.addListener('click', this.openChat);
  }

  openChat = () => {
    if (this.messageSection) {
      this.messageSection.getElement().dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { status: this.status, login: this.login },
        })
      );
    }
  };
}
