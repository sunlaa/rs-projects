import { ParamsOmitTag } from '../types/types';
import BaseElement from './base-element';

export default class Input extends BaseElement<HTMLInputElement> {
  constructor(params?: ParamsOmitTag<HTMLInputElement>) {
    super({ tag: 'input', autocomplete: 'off', ...params });
  }

  getData(): string {
    return this.element.value;
  }

  clear() {
    this.element.value = '';
  }
}
