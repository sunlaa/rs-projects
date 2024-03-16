import './switches.css';
import { BaseElement } from '../../../../utilits/base-elements/base-element';
import Translate from '../hints-view/translate/translate';
import TranslateSwitch from './translate-switch/translate-switch';
import { LocalStorage } from '../../../../utilits/servises/local-storage';

export default class Switches extends BaseElement {
  translateBlock: Translate;

  translateSwitch: TranslateSwitch;

  constructor(translateBlock: Translate) {
    super({ tag: 'section', className: 'switches' });

    this.translateSwitch = new TranslateSwitch(translateBlock);
    this.translateBlock = translateBlock;

    this.append(this.translateSwitch);

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
    this.translateBlock.setStyles({ opacity: '1' });
  };

  hideHints = () => {
    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.translateBlock.setStyles({ opacity: '0' });
    }
  };
}
