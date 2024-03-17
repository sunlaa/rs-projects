import './idk-button.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import CheckAndContinue from '../check-and-continue/check-and-continue';
import { sources } from '../../../game-logic/user-select';

export default class IDKButton extends Div {
  pieces: Div[][];

  lines: Div[];

  currentPieces: Div[];

  currentLine: Div;

  checkAndContinue: CheckAndContinue;

  count: number;

  level: number;

  round: number;

  constructor(
    pieces: Div[][],
    lines: Div[],
    checkAndContinue: CheckAndContinue,
    level: number,
    round: number
  ) {
    super({ className: 'idk-button', content: "I don't know" });

    this.pieces = pieces;
    this.lines = lines;

    this.count = 0;
    this.level = level;
    this.round = round;

    this.checkAndContinue = checkAndContinue;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];

    this.addListener('click', this.fillLine);
  }

  fillLine = () => {
    this.currentPieces.sort((a, b) => +a.getElement().id - +b.getElement().id);

    this.currentLine.appendChildren(...this.currentPieces);

    this.checkAndContinue.transformToContinue(
      this.count,
      this.level,
      this.round
    );

    this.addTotheStatistics();

    if (this.count === 9) {
      this.removeListener('click', this.fillLine);
      const field = document.querySelector<HTMLElement>('.result-block');
      if (field) {
        field.dispatchEvent(new Event('end-of-round'));
      }
      this.element.dispatchEvent(
        new Event('show-result-button', { bubbles: true })
      );
    }
  };

  private addTotheStatistics() {
    const currentData =
      sources[this.level - 1].rounds[this.round - 1].words[this.count];
    const sentense = currentData.textExample;
    const audioSrc = currentData.audioExample;

    const statistic = document.querySelector<HTMLElement>('.statistics');

    if (statistic) {
      statistic.dispatchEvent(
        new CustomEvent('add-wrong', {
          bubbles: true,
          detail: {
            sentense,
            audioSrc,
          },
        })
      );
    }
  }

  updateListener = () => {
    this.count += 1;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];
  };
}
