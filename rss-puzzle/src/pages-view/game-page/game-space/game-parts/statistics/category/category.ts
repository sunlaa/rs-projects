import { BaseElement } from '../../../../../../utilits/base-elements/base-element';
import Div from '../../../../../../utilits/base-elements/div-element/div';

export default class Category extends Div {
  constructor(content: string) {
    super(
      { className: 'category' },
      new BaseElement({
        tag: 'h1',
        className: 'category-title',
        content,
      })
    );
  }
}
