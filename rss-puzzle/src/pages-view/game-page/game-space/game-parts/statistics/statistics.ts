import './statistics.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';
import Audio from '../../../hints/hints-view/audio/audio';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';

export default class Statistics extends Div {
  continueButton: Div;

  correctSentenses: Div;

  wrongSentenses: Div;

  level: number;

  round: number;

  constructor(level: number, round: number, imgSrc: string) {
    super({ className: 'statistics' });

    this.continueButton = new Div({
      className: 'continue-button',
      content: 'Continue',
    });

    this.level = level;
    this.round = round;

    const image = new BaseElement<HTMLImageElement>({
      tag: 'img',
      className: 'image',
      src: imgSrc,
    });

    this.correctSentenses = new Div(
      { className: 'category' },
      new BaseElement({
        tag: 'h1',
        className: 'category-title',
        content: 'I know',
      })
    );
    this.wrongSentenses = new Div(
      { className: 'category' },
      new BaseElement({
        tag: 'h1',
        className: 'category-title',
        content: "I don't know",
      })
    );

    this.continueButton.addListener('click', this.continue);

    this.appendChildren(
      image,
      this.correctSentenses,
      this.wrongSentenses,
      this.continueButton
    );

    this.element.addEventListener('add-correct', (event) => {
      const customEvent = event as CustomEvent;
      const { sentense } = customEvent.detail;
      const { audioSrc } = customEvent.detail;
      this.addSentenceCorrect(sentense, audioSrc);
    });

    this.element.addEventListener('add-wrong', (event) => {
      const customEvent = event as CustomEvent;
      const { sentense } = customEvent.detail;
      const { audioSrc } = customEvent.detail;
      this.addSentenceWrong(sentense, audioSrc);
    });
  }

  continue = () => {
    this.element.dispatchEvent(
      new CustomEvent('next-round', {
        bubbles: true,
        detail: { level: this.level, round: this.round + 1 },
      })
    );

    this.saveAndMarkPassed();

    const backdrop = document.querySelector('.backdrop');
    if (backdrop) backdrop.remove();
  };

  addSentenceCorrect = (string: string, audioSrc: string) => {
    const sentense = new Div(
      { content: string, className: 'sentense' },
      new Audio(audioSrc)
    );
    this.correctSentenses.append(sentense);
  };

  addSentenceWrong = (string: string, audioSrc: string) => {
    const sentense = new Div(
      { content: string, className: 'sentense' },
      new Audio(audioSrc)
    );
    this.wrongSentenses.append(sentense);
  };

  saveAndMarkPassed() {
    const option = document.querySelector<HTMLElement>(`#round-${this.round}`);
    if (option) option.classList.add('passed');

    const passedLevel = LocalStorage.get(`passed-level-${this.level}`);
    if (passedLevel) {
      passedLevel[this.round] = 'passed';
      LocalStorage.save(`passed-level-${this.level}`, passedLevel);
    } else {
      LocalStorage.save(`passed-level-${this.level}`, {
        [this.round]: 'passed',
      });
    }

    LocalStorage.save('level-data', {
      level: `${this.level}`,
      round: `${this.round}`,
    });
  }
}
