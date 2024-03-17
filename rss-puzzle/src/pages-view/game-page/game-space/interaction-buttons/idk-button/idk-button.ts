import './idk-button.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import SourceBlock from '../../game-parts/source-block/source-block';
import CheckButton from '../check-and-continue/check-button/check-button';

export default class IDKButton extends Div {
  pieces: Div[][];

  lines: Div[];

  currentPieces: Div[];

  currentLine: Div;

  sourceBlock: SourceBlock;

  checkButton: CheckButton;

  count: number;

  constructor(
    pieces: Div[][],
    lines: Div[],
    sourceBlock: SourceBlock,
    checkButton: CheckButton
  ) {
    super({ className: 'idk-button', content: "I don't know" });

    this.pieces = pieces;
    this.lines = lines;

    this.count = 0;

    this.checkButton = checkButton;
    this.sourceBlock = sourceBlock;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];

    this.addListener('click', this.fillLine);
  }

  fillLine = () => {
    this.currentPieces.sort((a, b) => +a.getElement().id - +b.getElement().id);

    this.currentLine.appendChildren(...this.currentPieces);

    this.checkButton.transformToContinue();

    if (this.count === 9) {
      this.removeListener('click', this.fillLine);
      // console.log('vin in idk!');
    }
  };

  updateListener = () => {
    this.count += 1;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];
  };
}
