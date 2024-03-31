import './global.css';
import Garage from '../pages/garage/garage-view';
import Router from '../utils/servises/router';
import BaseElement from '../utils/components/base-element';
import Winners from '../pages/winners/winners';
import Navigation from '../navigation/navigate-header';

export default class App {
  winners: BaseElement;

  garage: BaseElement;

  router: Router;

  constructor() {
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

  run() {
    this.router.navigate('garage');
  }

  private createRoutes() {
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
