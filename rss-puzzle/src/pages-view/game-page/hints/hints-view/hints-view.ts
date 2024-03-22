import './hints-view.css';
import Translate from './translate/translate';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import Audio from './audio/audio';
import { ChoosenSentensesData } from '../../../../utilits/types/types';

export default class Hints extends BaseElement {
  sentenseData: ChoosenSentensesData;

  translateBlock: Translate;

  audioBlock: Audio;

  count: number;

  constructor(sentenseData: ChoosenSentensesData) {
    super({ tag: 'section', className: 'hints' });

    this.translateBlock = new Translate(sentenseData.translate[0]);
    this.audioBlock = new Audio(sentenseData.audioSrc[0]);

    this.count = 1;

    this.sentenseData = sentenseData;
    this.appendChildren(this.translateBlock, this.audioBlock);
  }

  updateHintsData() {
    const currentTranslate = this.sentenseData.translate[this.count];
    const currentAudioSrc = this.sentenseData.audioSrc[this.count];

    this.translateBlock.updateTranslate(currentTranslate);
    this.audioBlock.updateSrc(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentAudioSrc}`
    );

    this.count += 1;
  }
}
