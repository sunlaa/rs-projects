import Div from '../../../../../../utilits/base-elements/div-element/div';

export default class ContinueButton extends Div {
  count: number;

  level: number;

  round: number;

  constructor(count: number, level: number, round: number) {
    super({
      content: 'Continue',
      className: 'continue-button',
      styles: {
        display: 'none',
      },
    });

    this.count = count;
    this.level = level;
    this.round = round;

    this.addListener('click', this.next);
  }

  next = () => {
    if (this.count === 9) {
      this.element.dispatchEvent(
        new CustomEvent('next-round', {
          bubbles: true,
          detail: { level: this.level, round: this.round + 1 },
        })
      );

      const option = document.querySelector<HTMLElement>(
        `#option-${this.round}`
      );

      if (option) option.classList.add('passed');

      return;
    }
    const idkButton = document.querySelector<HTMLElement>('.idk-button');
    if (idkButton) idkButton.style.pointerEvents = '';
    this.element.dispatchEvent(new Event('empty', { bubbles: true }));
  };
}
