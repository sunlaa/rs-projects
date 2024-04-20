import './chat-page.css';
import BaseElement from '@/utils/components/base-element';
import HeaderChat from './header/header';
import MainChat from './main/main';
import FooterChat from './footer/footer';

export default class ChatPage extends BaseElement {
  constructor() {
    super(
      {
        tag: 'section',
        classes: ['chat-page'],
      },
      new HeaderChat(),
      new MainChat(),
      new FooterChat()
    );
  }
}
