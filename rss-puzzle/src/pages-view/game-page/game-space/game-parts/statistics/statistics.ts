import './statistics.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';

export default class Statistics extends Div {
  continueButton: Div;

  correctSentenses: Div;

  wrongSentenses: Div;

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

    this.correctSentenses = new Div(
      { className: 'category' },
      new BaseElement({
        tag: 'h1',
        className: 'category-title',
        content: 'I know',
      })
    );
    this.wrongSentenses = new Div(
      { className: 'category' },
      new BaseElement({
        tag: 'h1',
        className: 'category-title',
        content: "I don't know",
      })
    );

    this.continueButton.addListener('click', this.continue);
    this.appendChildren(
      this.correctSentenses,
      this.wrongSentenses,
      this.continueButton
    );

    this.element.addEventListener('add-correct', (event) => {
      const customEvent = event as CustomEvent;
      const { sentense } = customEvent.detail;
      this.addSentenceCorrect(sentense);
    });

    this.element.addEventListener('add-wrong', (event) => {
      const customEvent = event as CustomEvent;
      const { sentense } = customEvent.detail;
      this.addSentenceWrong(sentense);
    });
  }

  continue = () => {
    this.element.dispatchEvent(
      new CustomEvent('next-round', {
        bubbles: true,
        detail: { level: this.level, round: this.round + 1 },
      })
    );
  };

  addSentenceCorrect = (string: string) => {
    const sentense = new Div({ content: string, className: 'sentense' });
    this.correctSentenses.append(sentense);
  };

  addSentenceWrong = (string: string) => {
    const sentense = new Div({ content: string, className: 'sentense' });
    this.wrongSentenses.append(sentense);
  };
}
