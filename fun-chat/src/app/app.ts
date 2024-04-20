import './global.css';
import ws from '@/web-socket/web-socket';
import EntryPage from '@/pages/authentication-page/entry-page';
import ChatPage from '@/pages/chat-page/chat-page';
import Router from '@/utils/services/router';
import BaseElement from '@/utils/components/base-element';
import SessionStorage from '@/utils/services/session-storage';
import InfoPage from '@/pages/info-page/info-page';

export default class App {
  container = document.body;

  router: Router;

  currentHref: 'entry' | 'chat' = 'entry';

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
  }

  run() {
    ws.router = this.router;
  }

  private createRoutes() {
    return [
      {
        path: 'entry',
        callback: () => {
          const data = SessionStorage.get('user-data');
          if (!data) {
            this.container.innerHTML = '';
            this.container.append(new EntryPage(this.router).element);
          } else {
            ws.logOut();
          }
          this.currentHref = 'entry';
        },
      },
      {
        path: 'chat',
        callback: () => {
          const data = SessionStorage.get('user-data');
          if (!data) {
            this.router.navigate('entry');
          } else {
            this.container.innerHTML = '';
            this.container.append(new ChatPage().element);
            this.currentHref = 'chat';
          }
        },
      },
      {
        path: 'info',
        callback: () => {
          this.container.innerHTML = '';
          this.container.append(new InfoPage(this.currentHref).element);
        },
      },
    ];
  }

  setContent(page: BaseElement) {
    this.container.innerHTML = '';
    this.container.append(page.getElement());
  }
}
