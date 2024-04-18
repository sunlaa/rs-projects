import './chat-page.css';
import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';
import HeaderChat from './header/header';
import MainChat from './main/main';
import FooterChat from './footer/footer';

export default class ChatPage extends BaseElement {
  constructor(router: Router) {
    super(
      {
        tag: 'section',
        classes: ['chat-page'],
      },
      new HeaderChat(router),
      new MainChat(),
      new FooterChat()
    );
  }
}
