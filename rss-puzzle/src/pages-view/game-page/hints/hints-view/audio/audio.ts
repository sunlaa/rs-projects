import Div from '../../../../../utilits/base-elements/div-element/div';

export default class Audio extends Div {
  audio: HTMLAudioElement;

  constructor(audioSrc: string) {
    super({ className: 'audio-block' });
    this.audio = document.createElement('audio');
    this.audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioSrc}`;

    this.append(this.audio);

    this.addListener('click', this.play);
    this.audio.addEventListener('play', this.setAnimation);
    this.audio.addEventListener('ended', this.removeAnimation);
  }

  updateSrc(newSrc: string) {
    this.audio.src = newSrc;
  }

  private play = () => {
    this.audio.play();
  };

  private setAnimation = () => {
    this.addClass('animated');
  };

  private removeAnimation = () => {
    this.removeClass('animated');
  };
}
