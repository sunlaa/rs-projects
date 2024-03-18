import './entry-page.css';
import { BaseElement } from '../../utilits/base-elements/base-element';
import Form from './form/form';
import Title from './title/title';
import Router from '../../utilits/servises/router';

class EntryPage extends BaseElement {
  constructor(router: Router) {
    super(
      { tag: 'section', className: 'entry-page' },
      new Title(),
      new Form(router)
    );
  }
}

export default EntryPage;
