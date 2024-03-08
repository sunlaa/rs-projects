import {
  BaseElement,
  ParamsOmitTag,
} from '../../../../utilits/base-elements/base-element';

class Label extends BaseElement<HTMLLabelElement> {
  constructor(
    params: ParamsOmitTag,
    ...childs: (BaseElement | HTMLElement | null)[]
  ) {
    super({ tag: 'label', ...params }, ...childs);
  }
}

export default Label;
