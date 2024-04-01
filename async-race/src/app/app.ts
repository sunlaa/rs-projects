import './global.css';
import Garage from '../pages/garage/garage-view';
import Router from '../utils/servises/router';
import Winners from '../pages/winners/winners';
import Navigation from '../navigation/navigate-header';

export default class App {
  container: HTMLElement = document.body;

  winners: HTMLElement;

  garage: HTMLElement;

  router: Router;

  constructor() {
    this.garage = new Garage().getElement();
    this.winners = new Winners().getElement();
    this.container.append(new Navigation(this.winners).getElement());

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
          this.winners.remove();
          this.container.append(this.garage);
        },
      },
      {
        path: 'winners',
        callback: () => {
          this.garage.remove();
          this.container.append(this.winners);
        },
      },
    ];
  }
}
