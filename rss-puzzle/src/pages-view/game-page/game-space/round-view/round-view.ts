import './round-view.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import UserSelect from '../../game-logic/user-select';
import ResultBlock from '../game-parts/result-block/result-block';
import SourceBlock from '../game-parts/source-block/source-block';
import Slicer from '../game-parts/source-block/piece-slicer/piece-slicer';
import { CutElements, Sizes } from '../../../../utilits/types/types';
import CheckButton from '../interaction-button/check-and-continue/check-button/check-button';
import CheckAndContinue from '../interaction-button/check-and-continue/check-and-continue';
import IDKButton from '../interaction-button/idk-button/idk-button';
import Hints from '../../hints/hints-view/hints-view';
import Switches from '../../hints/switches/switches';
import Pic from '../../game-logic/pic';

export default class RoundView extends BaseElement {
  sentenses: string[];

  translate: string[];

  audioSrc: string[];

  imgSrc: string;

  level: number;

  round: number;

  constructor(level: number, round: number) {
    super({ tag: 'section', className: 'round-view' });

    const roundData = new UserSelect(level, round);

    this.sentenses = roundData.getSentenses();
    this.translate = roundData.getTranslate();
    this.audioSrc = roundData.getAudioSrc();
    this.imgSrc = roundData.getImgSrc();

    this.level = level;
    this.round = round;

    this.draw(800);
  }

  private async getSizes(desiredWidth: number) {
    const picture = new Pic(this.imgSrc);
    const sizes = await picture.getSizes();
    this.imgSrc = picture.src;

    const desiredHeight = (desiredWidth / sizes.blockWidth) * sizes.blockHeight;
    return {
      blockWidth: desiredWidth,
      blockHeight: desiredHeight,
    };
  }

  async draw(desiredWidth: number) {
    const sizes: Sizes = await this.getSizes(desiredWidth);

    const slicer = new Slicer(sizes, this.sentenses, this.imgSrc);
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

    const idkButton = new IDKButton(
      cutElements.pieces,
      cutElements.lines,
      sources,
      checkButton
    );

    const hints = new Hints(this.translate, this.audioSrc);

    const switches = new Switches(hints.translateBlock, hints.audioBlock);

    this.addListener('empty', () => {
      hints.updateHintsData();
      sources.updatePieces();
      idkButton.updateListener();
      checkButton.updateCounter();
      checkAndContinue.transformToCheck();
    });

    this.appendChildren(
      switches,
      hints,
      field,
      sources,
      checkAndContinue,
      idkButton
    );
  }
}
