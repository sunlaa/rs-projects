import BaseElement from '../utils/components/base-element';
import NavigateButton from './navigate-button/navigate-button';

export default class Navigation extends BaseElement {
  constructor() {
    super(
      { tag: 'nav', className: ['navigation'] },
      new NavigateButton('To garage', '#garage'),
      new NavigateButton('To winners', '#winners')
    );
  }
}
