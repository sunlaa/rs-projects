import EntryPage from '@/pages/authentication-page/entry-page';
import ChatPage from '@/pages/chat-page/chat-page';
import Router from '@/utils/services/router';

export default class App {
  container = document.body;

  router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.router = new Router(routes);
  }

  run() {
    this.router.navigate('entry');
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
          this.container.innerHTML = '';
          this.container.append(new ChatPage().getElement());
        },
      },
    ];
  }
}
