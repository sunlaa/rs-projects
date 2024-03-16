import Div from '../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';

export default class Audio extends Div {
  audio: HTMLAudioElement;

  constructor(audioSrc: string) {
    super({ className: 'audio-block' });
    this.audio = document.createElement('audio');
    this.audio.src = audioSrc;

    this.append(this.audio);

    if (LocalStorage.get('hints-data')?.audio === 'false') {
      this.setStyles({ opacity: '0' });
    }

    this.addListener('click', this.play);
    this.audio.addEventListener('play', this.setAnimation);
    this.audio.addEventListener('ended', this.removeAnimation);
  }

  updateSrc(newSrc: string) {
    this.audio.src = newSrc;
  }

  play = () => {
    this.audio.play();
  };

  setAnimation = () => {
    this.addClass('animated');
  };

  removeAnimation = () => {
    this.removeClass('animated');
  };
}
