import './game-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Router from '../../utilits/servises/router';
import RoundView from './game-space/round-view/round-view';

export default class Game extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super({ tag: 'section', className: 'game-page' });
    this.router = router;

    const round = new RoundView(1, 1);

    this.append(round);
  }
}
