import './global.css';
import { BaseElement } from '../utilits/base-elements/base-element';
import StartPage from '../pages-view/start-page/start-page';
// import EntryPage from '../pages-view/entry-page/entry-page';
import Game from '../pages-view/game-page/game-page';
import Router from '../utilits/servises/router';

export default class App {
  container: HTMLElement;

  router: Router;

  constructor() {
    this.container = document.body;
    const routes = this.createRoutes();

    this.router = new Router(routes);
  }

  public run() {
    this.router.navigate('start-page');
  }

  createRoutes() {
    return [
      {
        path: 'start-page',
        callback: () => {
          this.setContent(new StartPage());
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
