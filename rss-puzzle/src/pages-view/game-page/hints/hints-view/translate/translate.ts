import Div from '../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';

export default class Translate extends Div {
  translate: string;

  constructor(translate: string) {
    super({ className: 'translate-block', content: translate });

    this.translate = translate;
    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.setStyles({ opacity: '0' });
    }
  }

  updateTranslate(newTranslate: string) {
    this.setContent(newTranslate);
  }
}
