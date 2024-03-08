import './start-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Title from '../entry-page/title/title';
import Greet from './greet/greet';
import Brief from './brief/brief';
import StartButton from './start-button/start-button';

class StartPage extends BaseElement {
  constructor() {
    super(
      { tag: 'section', className: 'start-page' },
      new Title(),
      new Greet(),
      new Brief(),
      new StartButton()
    );
  }
}

export default StartPage;
