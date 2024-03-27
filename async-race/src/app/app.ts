import './global.css';
import Garage from '../pages/garage/garage-view';
import Router from '../utils/servises/router';
import BaseElement from '../utils/components/base-element';
import Winners from '../pages/winners/winners';

export default class App {
  container: HTMLElement;

  router: Router;

  constructor() {
    this.container = document.body;
    const routes = this.createRoutes();

    this.router = new Router(routes);
  }

  public run() {
    this.router.navigate('garage');
  }

  createRoutes() {
    return [
      {
        path: 'garage',
        callback: () => {
          this.setContent(new Garage());
        },
      },
      {
        path: 'winners',
        callback: () => {
          this.setContent(new Winners());
        },
      },
    ];
  }

  private setContent(content: BaseElement) {
    const main = this.container.lastElementChild;
    if (main) {
      main.remove();
      this.container.append(content.getElement());
    }
    this.container.append(content.getElement());
  }
}
