import './start-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Title from '../entry-page/title/title';
import Brief from './brief/brief';

class StartPage extends BaseElement {
  constructor() {
    super(
      { tag: 'section', className: 'start-page' },
      new Title(),
      new Brief()
    );
  }
}

export default StartPage;
