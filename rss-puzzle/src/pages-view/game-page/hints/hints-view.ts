import Translate from './hints-view/translate/translate';
import { BaseElement } from '../../../utilits/base-elements/base-element';

export default class Hints extends BaseElement {
  translateText: string[];

  translateBlock: Translate;

  count: number;

  constructor(translateText: string[]) {
    super({ tag: 'section', className: 'hints' });

    this.translateBlock = new Translate(translateText[0]);

    this.count = 1;

    this.translateText = translateText;
    this.appendChildren(this.translateBlock);
  }

  updateHintsData() {
    const currentTranslate = this.translateText[this.count];

    this.translateBlock.updateTranslate(currentTranslate);

    this.count += 1;
  }
}
