import Div from '../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';
import Translate from '../../hints-view/translate/translate';

export default class TranslateSwitch extends Div {
  translateBlock: Translate;

  constructor(translateBlock: Translate) {
    super({ className: 'switch' });

    this.addClass('translate-switch');

    this.translateBlock = translateBlock;
    this.addListener('click', this.translateToogle);

    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.classList().add('disabled');
    }
  }

  updateLocalStorage() {
    const switchData = LocalStorage.get('hints-data');

    if (!switchData) throw new Error('No data about hints!');

    if (this.classList().contains('disabled')) {
      switchData.translate = 'false';
    } else {
      switchData.translate = 'true';
    }
    LocalStorage.save('hints-data', switchData);
  }

  translateToogle = () => {
    if (this.classList().contains('disabled')) {
      this.translateBlock.setStyles({ opacity: '1' });
      this.classList().remove('disabled');
    } else {
      this.translateBlock.setStyles({ opacity: '0' });
      this.classList().add('disabled');
    }
    this.updateLocalStorage();
  };
}
