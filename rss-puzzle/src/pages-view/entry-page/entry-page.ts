import './entry-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Form from './form/form';
import Title from './title/title';

class EntryPage extends BaseElement {
  constructor() {
    super({ tag: 'section', className: 'entry-page' }, new Title(), new Form());
  }
}

export default EntryPage;
