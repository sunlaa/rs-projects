import './start-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Title from '../entry-page/title/title';
import Greet from './greet/greet';
import Brief from './brief/brief';
import StartButton from './start-button/start-button';
import Router from '../../utilits/servises/router';
import ExitButton from '../game-page/exit/exit-button';

class StartPage extends BaseElement {
  constructor(router: Router) {
    super(
      { tag: 'section', className: 'start-page' },
      new Title(),
      new Greet(),
      new Brief(),
      new StartButton(),
      new ExitButton(router)
    );
  }
}

export default StartPage;
