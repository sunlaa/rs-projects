import './switches.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import Translate from '../hints-view/translate/translate';
import TranslateSwitch from './translate-switch/translate-switch';
import { LocalStorage } from '../../../../utilits/servises/local-storage';
import Audio from '../hints-view/audio/audio';
import AudioSwitch from './audio-switch/audio-switch';

export default class Switches extends BaseElement {
  translateBlock: Translate;

  audioBlock: Audio;

  translateSwitch: TranslateSwitch;

  audioSwitch: AudioSwitch;

  constructor(translateBlock: Translate, audioBlock: Audio) {
    super({ tag: 'section', className: 'switches' });

    this.translateSwitch = new TranslateSwitch(translateBlock);
    this.translateBlock = translateBlock;

    this.audioSwitch = new AudioSwitch(audioBlock);
    this.audioBlock = audioBlock;

    this.appendChildren(this.translateSwitch, this.audioSwitch);

    if (!LocalStorage.get('hints-data')) {
      LocalStorage.save('hints-data', {
        translate: 'true',
        audio: 'true',
        image: 'true',
      });
    }

    this.addListener('show-after-win', this.showHints);
    this.addListener('hide-after-win', this.hideHints);
  }

  showHints = () => {
    this.translateBlock.removeClass('off');
    this.audioBlock.removeClass('off');
  };

  hideHints = () => {
    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.translateBlock.addClass('off');
    }
    if (LocalStorage.get('hints-data')?.audio === 'false') {
      this.audioBlock.addClass('off');
    }
  };
}
