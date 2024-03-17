import Div from '../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';
import Audio from '../../hints-view/audio/audio';

export default class AudioSwitch extends Div {
  audioBlock: Audio;

  constructor(audioBlock: Audio) {
    super({ className: 'switch' });

    this.addClass('audio-switch');

    this.audioBlock = audioBlock;
    this.addListener('click', this.audioToogle);

    if (LocalStorage.get('hints-data')?.audio === 'false') {
      this.classList().add('disabled');
      this.audioBlock.addClass('off');
    }
  }

  audioToogle = () => {
    if (this.classList().contains('disabled')) {
      this.audioBlock.removeClass('off');
      this.classList().remove('disabled');
    } else {
      this.audioBlock.addClass('off');
      this.classList().add('disabled');
    }
    this.updateLocalStorage();
  };

  private updateLocalStorage() {
    const switchData = LocalStorage.get('hints-data');

    if (!switchData) throw new Error('No data about hints!');

    if (this.classList().contains('disabled')) {
      switchData.audio = 'false';
    } else {
      switchData.audio = 'true';
    }
    LocalStorage.save('hints-data', switchData);
  }
}
