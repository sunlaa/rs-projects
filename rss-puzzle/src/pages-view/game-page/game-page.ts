import { BaseElement } from '../../utilits/base-elements/base-element';
import Router from '../../utilits/servises/router';

export default class Game extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super({ tag: 'section', className: 'game-page' });
    this.router = router;
  }
}
