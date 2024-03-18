import './game-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Router from '../../utilits/servises/router';
import SelectMenu from './select-menu/select-menu';
import ExitButton from './exit/exit-button';
import Div from '../../utilits/base-elements/div-element/div';

export default class Game extends BaseElement {
  router: Router;

  constructor(router: Router) {
    super({ tag: 'section', className: 'game-page' });

    const header = new Div({ className: 'game-header' });
    this.router = router;

    const selectMenu = new SelectMenu(this);

    this.element.addEventListener('next-round', (event) => {
      const customEvent = event as CustomEvent;
      const { level } = customEvent.detail;
      const { round } = customEvent.detail;
      selectMenu.drawRound(level, round);
    });

    header.appendChildren(selectMenu, new ExitButton(router));
    this.append(header);
  }
}
