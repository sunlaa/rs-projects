import './statistics.css';
import Div from '../../../../../utilits/base-elements/div-element/div';

export default class Statistics extends Div {
  continueButton: Div;

  level: number;

  round: number;

  constructor(level: number, round: number) {
    super({ className: 'statistics' });

    this.continueButton = new Div({
      className: 'continue-button',
      content: 'Continue',
    });

    this.level = level;
    this.round = round;

    this.continueButton.addListener('click', this.continue);
    this.append(this.continueButton);
  }

  continue = () => {
    this.element.dispatchEvent(
      new CustomEvent('next-round', {
        bubbles: true,
        detail: { level: this.level, round: this.round + 1 },
      })
    );
  };
}
