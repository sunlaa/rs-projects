import './hints-view.css';
import Translate from './translate/translate';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import Audio from './audio/audio';

export default class Hints extends BaseElement {
  translateText: string[];

  audioSrc: string[];

  translateBlock: Translate;

  audioBlock: Audio;

  count: number;

  constructor(translateText: string[], audioSrc: string[]) {
    super({ tag: 'section', className: 'hints' });

    this.translateBlock = new Translate(translateText[0]);
    this.audioBlock = new Audio(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioSrc[0]}`
    );

    this.count = 1;

    this.translateText = translateText;
    this.audioSrc = audioSrc;
    this.appendChildren(this.translateBlock, this.audioBlock);
  }

  updateHintsData() {
    const currentTranslate = this.translateText[this.count];
    const currentAudioSrc = this.audioSrc[this.count];

    this.translateBlock.updateTranslate(currentTranslate);
    this.audioBlock.updateSrc(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentAudioSrc}`
    );

    this.count += 1;
  }
}
