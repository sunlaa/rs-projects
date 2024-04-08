import { ParamsOmitTag } from '../types/types';
import BaseElement from './base-element';

export default class Label extends BaseElement<HTMLLabelElement> {
  constructor(
    params?: ParamsOmitTag,
    ...childs: (BaseElement | HTMLElement | null)[]
  ) {
    super({ tag: 'label', ...params }, ...childs);
  }
}
