import BaseElement from '../../utils/components/base-element';

export default class NavigateButton extends BaseElement<HTMLAnchorElement> {
  constructor(content: string, href: string) {
    super({
      tag: 'a',
      className: ['navigation-button', 'button'],
      content,
      href,
    });
  }
}
