import './chat-page.css';
import BaseElement from '@/utils/components/base-element';
import HeaderChat from './header/header';
import MainChat from './main/main';

export default class ChatPage extends BaseElement {
  constructor() {
    super(
      {
        tag: 'section',
        className: ['chat-page'],
      },
      new HeaderChat(),
      new MainChat()
    );
  }
}
