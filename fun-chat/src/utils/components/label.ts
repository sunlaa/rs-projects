import { ParamsOmitTag } from '../types/types';
import BaseElement from './base-element';
import Input from './input';

export default class Label extends BaseElement<HTMLLabelElement> {
  input: Input;

  constructor(child: Input, params?: ParamsOmitTag<HTMLLabelElement>) {
    super({ tag: 'label', ...params }, child);

    this.input = child;
  }
}
