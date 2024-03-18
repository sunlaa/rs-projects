import './game-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Router from '../../utilits/servises/router';
import SelectMenu from './select-menu/select-menu';
import ExitButton from './exit/exit-button';

export default class Game extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super({ tag: 'section', className: 'game-page' }, new ExitButton(router));
    this.router = router;

    const selectMenu = new SelectMenu(this);

    this.element.addEventListener('next-round', (event) => {
      const customEvent = event as CustomEvent;
      const { level } = customEvent.detail;
      const { round } = customEvent.detail;
      selectMenu.drawRound(level, round);
    });

    this.append(selectMenu);
  }
}
