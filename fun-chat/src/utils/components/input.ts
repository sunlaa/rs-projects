import { ParamsOmitTag } from '../types/types';
import BaseElement from './base-element';

export default class Input extends BaseElement<HTMLInputElement> {
  constructor(params?: ParamsOmitTag) {
    super({ tag: 'input', ...params });
  }
}
