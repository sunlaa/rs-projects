import './round-view.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import UserSelect from '../../game-logic/user-select';
import ResultBlock from '../game-parts/result-block/result-block';
import SourceBlock from '../game-parts/source-block/source-block';
import Slicer from '../game-parts/source-block/piece-slicer/piece-slicer';
import { CutElements, Sizes } from '../../../../utilits/types/types';
import CheckButton from '../interaction-button/check-and-continue/check-button/check-button';
import CheckAndContinue from '../interaction-button/check-and-continue/check-and-continue';

export default class RoundView extends BaseElement {
  sentenses: string[];

  level: number;

  round: number;

  constructor(level: number, round: number) {
    super({ tag: 'section', className: 'round-view' });

    const roundData = new UserSelect(level, round);

    this.sentenses = roundData.getSentenses();

    this.level = level;
    this.round = round;

    this.draw();
  }

  draw() {
    const sizes: Sizes = { blockWidth: 800, blockHeight: 400 };

    const slicer = new Slicer(sizes, this.sentenses);
    const cutElements: CutElements = slicer.cut();

    const field = new ResultBlock(sizes, ...cutElements.lines);
    const sources = new SourceBlock(
      cutElements.pieces,
      cutElements.lines,
      sizes.blockWidth
    );
    const checkButton = new CheckButton(
      cutElements.lines,
      this.level,
      this.round
    );

    const checkAndContinue = new CheckAndContinue(checkButton);

    this.appendChildren(field, sources, checkAndContinue);
  }
}
