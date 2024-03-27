import BaseElement from '../../utils/components/base-element';

export default class NavigateButton extends BaseElement<HTMLAnchorElement> {
  constructor(href: string) {
    super({ tag: 'a', href });
  }
}
