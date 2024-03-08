import { BaseElement, ParamsOmitTag } from '../base-element';

class Div extends BaseElement<HTMLDivElement> {
  constructor(
    params: ParamsOmitTag,
    ...childs: (BaseElement | HTMLElement | null)[]
  ) {
    super({ tag: 'div', ...params }, ...childs);
  }
}
export default Div;
