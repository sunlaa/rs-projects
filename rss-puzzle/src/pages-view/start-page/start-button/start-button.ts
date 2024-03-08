import { BaseElement } from '../../../utilits/base-elements/base-element';

class StartButton extends BaseElement<HTMLAnchorElement> {
  constructor() {
    super({
      tag: 'a',
      className: 'start-button',
      content: 'Start',
      href: '#game-page',
    });
  }
}

export default StartButton;
