import './interaction-button.css';
import Div from '../../../../utilits/base-elements/div-element/div';
import Statistics from '../game-parts/statistics/statistics';
import CheckAndContinue from './check-and-continue/check-and-continue';
import CheckButton from './check-and-continue/check-button/check-button';
import IDKButton from './idk-button/idk-button';
import ResultButton from './result-button/result-button';

export default class InteractButtons extends Div {
  checkAndContinue: CheckAndContinue;

  checkButton: CheckButton;

  idkButton: IDKButton;

  resultButton: ResultButton;

  constructor(
    pieces: Div[][],
    lines: Div[],
    level: number,
    round: number,
    statistics: Statistics
  ) {
    super({ className: 'interact-buttons' });

    this.checkButton = new CheckButton(lines, level, round);
    this.checkAndContinue = new CheckAndContinue(this.checkButton);
    this.idkButton = new IDKButton(
      pieces,
      lines,
      this.checkAndContinue,
      level,
      round
    );
    this.resultButton = new ResultButton(statistics);

    this.appendChildren(this.idkButton, this.checkAndContinue);

    this.addListener('show-result-button', this.showResultButton);
  }

  showResultButton = () => {
    this.append(this.resultButton);
  };
}
