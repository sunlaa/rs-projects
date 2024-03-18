import Div from '../../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../../utilits/servises/local-storage';

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

      LocalStorage.save('level-data', {
        level: `${this.level}`,
        round: `${this.round}`,
      });

      return;
    }
    const idkButton = document.querySelector<HTMLElement>('.idk-button');
    if (idkButton) idkButton.style.pointerEvents = '';
    this.element.dispatchEvent(new Event('empty', { bubbles: true }));
  };
}
