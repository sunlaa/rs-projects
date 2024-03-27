import './global.css';
import Garage from '../pages/garage/garage-view';
import Router from '../utils/servises/router';
import BaseElement from '../utils/components/base-element';
import Winners from '../pages/winners/winners';
import Navigation from '../navigation/navigate-header';

export default class App {
  main: BaseElement;

  router: Router;

  constructor() {
    this.main = new BaseElement({ tag: 'main', className: ['main'] });
    document.body.append(new Navigation().getElement(), this.main.getElement());

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
    this.main.getElement().innerHTML = '';
    this.main.append(content);
  }
}
