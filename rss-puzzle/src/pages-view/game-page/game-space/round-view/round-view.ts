import './round-view.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import UserSelect from '../../game-logic/user-select';
import ResultBlock from '../game-parts/result-block/result-block';
import SourceBlock from '../game-parts/source-block/source-block';
import Slicer from '../game-parts/source-block/piece-slicer/piece-slicer';
import {
  ChoosenSentensesData,
  CutElements,
  Sizes,
  ImageData,
} from '../../../../utilits/types/types';
import Hints from '../../hints/hints-view/hints-view';
import Switches from '../../hints/switches/switches';
import PicSizes from '../../game-logic/pic-sizes';
import Statistics from '../game-parts/statistics/statistics';
import InteractButtons from '../interaction-buttons/interaction-buttons';

const fieldWidth = 700;

export default class RoundView extends BaseElement {
  sentensesData: ChoosenSentensesData;

  imageData: ImageData;

  level: number;

  round: number;

  constructor(level: number, round: number) {
    super({ tag: 'section', className: 'round-view' });

    this.level = level;
    this.round = round;

    this.sentensesData = this.getSentensesData();
    this.imageData = this.getImageData();

    this.draw(fieldWidth);
  }

  private getSentensesData(): ChoosenSentensesData {
    const roundData = new UserSelect(this.level, this.round);
    return {
      sentenses: roundData.getSentenses(),
      translate: roundData.getTranslate(),
      audioSrc: roundData.getAudioSrc(),
    };
  }

  private getImageData(): ImageData {
    const roundData = new UserSelect(this.level, this.round);
    return {
      imgSrc: roundData.getImgSrc(),
      imgTitle: roundData.getImageTitle(),
      imgAuthor: roundData.getImageAuthorAndYear(),
    };
  }

  async draw(desiredWidth: number) {
    const sizes: Sizes = await this.getSizes(desiredWidth);
    const cutElements: CutElements = this.getCutElements(sizes);

    const elements = this.initElements(sizes, cutElements);

    this.appendChildren(...elements);
  }

  private async getSizes(desiredWidth: number) {
    const picture = new PicSizes(this.imageData.imgSrc);
    const sizes = await picture.getSizes();
    this.imageData.imgSrc = picture.src;

    const desiredHeight = (desiredWidth / sizes.blockWidth) * sizes.blockHeight;
    return {
      blockWidth: desiredWidth,
      blockHeight: desiredHeight,
    };
  }

  private getCutElements(sizes: Sizes): CutElements {
    const slicer = new Slicer(
      sizes,
      this.sentensesData.sentenses,
      this.imageData.imgSrc
    );
    return slicer.cut();
  }

  private addUpdateListener(
    hints: Hints,
    sourceBlock: SourceBlock,
    interactButtons: InteractButtons
  ) {
    this.addListener('next-sentense', () => {
      hints.updateHintsData();
      sourceBlock.updatePieces();
      interactButtons.idkButton.updateListener();
      interactButtons.checkButton.updateCounter();
      interactButtons.checkAndContinue.transformToCheck();
    });
  }

  private initElements(sizes: Sizes, cutElements: CutElements) {
    const resultBlock = new ResultBlock(
      sizes,
      this.imageData,
      ...cutElements.lines
    );
    const sourceBlock = new SourceBlock(
      cutElements.pieces,
      cutElements.lines,
      sizes
    );
    const statistics = new Statistics(
      this.level,
      this.round,
      this.imageData.imgSrc
    );
    const interactButtons = new InteractButtons(
      cutElements.pieces,
      cutElements.lines,
      this.level,
      this.round,
      statistics
    );

    const hints = new Hints(this.sentensesData);

    const switches = new Switches(
      hints.translateBlock,
      hints.audioBlock,
      this.imageData.imgSrc,
      cutElements.pieces
    );

    this.addUpdateListener(hints, sourceBlock, interactButtons);

    return [
      switches,
      hints,
      resultBlock,
      sourceBlock,
      interactButtons,
      statistics,
    ];
  }
}
