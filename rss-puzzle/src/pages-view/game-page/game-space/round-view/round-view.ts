import './round-view.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import UserSelect from '../../game-logic/user-select';
import ResultBlock from '../game-parts/result-block/result-block';
import SourceBlock from '../game-parts/source-block/source-block';
import Slicer from '../game-parts/source-block/piece-slicer/piece-slicer';
import { CutElements, Sizes } from '../../../../utilits/types/types';

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
    const sizes: Sizes = { blockWidth: 1000, blockHeight: 500 };

    const slicer = new Slicer(sizes, this.sentenses);
    const cutElements: CutElements = slicer.cut();

    const field = new ResultBlock(sizes, ...cutElements.lines);
    const sources = new SourceBlock(
      cutElements.pieces,
      cutElements.lines,
      sizes.blockWidth
    );

    this.appendChildren(field, sources);
  }
}
