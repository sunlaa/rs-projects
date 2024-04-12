import './chat-page.css';
import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';
import HeaderChat from './header/header';
import UsersSection from './main/users-section/user-section';

export default class ChatPage extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super(
      {
        tag: 'section',
        className: ['chat-page'],
      },
      new HeaderChat(),
      new UsersSection()
    );

    this.router = router;
  }
}
