import './global.css';
import { BaseElement } from '../utilits/base-elements/base-element';
import StartPage from '../pages-view/start-page/start-page';
import EntryPage from '../pages-view/entry-page/entry-page';
import Game from '../pages-view/game-page/game-page';
import Router from '../utilits/servises/router';
import { LocalStorage } from '../utilits/servises/local-storage';

export default class App {
  container: HTMLElement;

  router: Router;

  constructor() {
    this.container = document.body;
    const routes = this.createRoutes();

    this.router = new Router(routes);
  }

  public run() {
    const userData = LocalStorage.get('user-data');
    if (userData) {
      this.router.navigate('start-page');
    } else {
      this.router.navigate('entry-page');
    }
  }

  createRoutes() {
    return [
      {
        path: 'entry-page',
        callback: () => {
          LocalStorage.clear();
          this.setContent(new EntryPage(this.router));
        },
      },
      {
        path: 'start-page',
        callback: () => {
          this.setContent(new StartPage(this.router));
        },
      },
      {
        path: 'game-page',
        callback: () => {
          this.setContent(new Game(this.router));
        },
      },
    ];
  }

  private setContent(content: BaseElement) {
    this.container.innerHTML = '';
    this.container.append(content.getElement());
  }
}
