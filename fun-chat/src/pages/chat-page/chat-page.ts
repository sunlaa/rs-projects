import './chat-page.css';
import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';
import HeaderChat from './header/header';

export default class ChatPage extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super(
      {
        tag: 'section',
        className: ['chat-page'],
      },
      new HeaderChat()
    );

    this.router = router;
  }
}
