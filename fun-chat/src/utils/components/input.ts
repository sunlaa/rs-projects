import { ParamsOmitTag } from '../types/types';
import BaseElement from './base-element';

export default class Input extends BaseElement<HTMLInputElement> {
  constructor(params?: ParamsOmitTag<HTMLInputElement>) {
    super({ tag: 'input', autocomplete: 'off', ...params });
  }

  get value() {
    return this.element.value;
  }

  set value(text: string) {
    this.element.value = text;
  }

  focus() {
    this.element.focus();
  }

  clear() {
    this.element.value = '';
  }

  off() {
    this.element.disabled = true;
  }

  on() {
    this.element.disabled = false;
  }
}
