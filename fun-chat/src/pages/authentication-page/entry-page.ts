import './entry-page.css';
import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';
import AuthenticationForm from './entry-form/authentication-form';
import Title from './title/title';

export default class EntryPage extends BaseElement {
  constructor(router: Router) {
    super({ tag: 'section', className: ['entry-page'] });
    const authentication = new AuthenticationForm(router);
    this.appendChildren(new Title(), authentication);
  }
}
