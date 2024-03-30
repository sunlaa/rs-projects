import './global.css';
import Garage from '../pages/garage/garage-view';
import Router from '../utils/servises/router';
import BaseElement from '../utils/components/base-element';
import Winners from '../pages/winners/winners';
import Navigation from '../navigation/navigate-header';

export default class App {
  main: BaseElement;

  winners: BaseElement;

  garage: BaseElement;

  router: Router;

  constructor() {
    this.main = new BaseElement({ tag: 'main', className: ['main'] });
    this.garage = new Garage();
    this.winners = new Winners();
    document.body.append(
      new Navigation().getElement(),
      this.garage.getElement(),
      this.winners.getElement()
    );

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
          App.setContent(this.garage, this.winners);
        },
      },
      {
        path: 'winners',
        callback: () => {
          App.setContent(this.winners, this.garage);
        },
      },
    ];
  }

  static setContent(page: BaseElement, previousPage: BaseElement) {
    previousPage.setStyles({ display: 'none' });
    page.setStyles({ display: 'block' });
  }
}
