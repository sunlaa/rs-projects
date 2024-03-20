import { Params } from '../types/types';
import BaseElement from './base-element';

export default class View {
  params: Params;

  view: BaseElement;

  constructor(params: Params = { tag: 'section', className: [''] }) {
    this.params = params;
    this.view = this.createView();
  }

  getElementView() {
    return this.view.getElement();
  }

  createView() {
    return new BaseElement(this.params);
  }
}
