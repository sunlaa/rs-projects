import './global.css';
import ws from '@/web-socket/web-socket';
import EntryPage from '@/pages/authentication-page/entry-page';
import ChatPage from '@/pages/chat-page/chat-page';
import Router from '@/utils/services/router';
import BaseElement from '@/utils/components/base-element';

export default class App {
  container = document.body;

  router: Router;

  chatPage: ChatPage;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);

    this.chatPage = new ChatPage(this.router);
  }

  run() {
    ws.router = this.router;
  }

  private createRoutes() {
    return [
      {
        path: 'entry',
        callback: () => {
          this.container.innerHTML = '';
          this.container.append(new EntryPage(this.router).getElement());
        },
      },
      {
        path: 'chat',
        callback: () => {
          // доступ только авторизованым!
          this.setContent(this.chatPage);
        },
      },
    ];
  }

  setContent(page: BaseElement) {
    this.container.innerHTML = '';
    this.container.append(page.getElement());
  }
}
