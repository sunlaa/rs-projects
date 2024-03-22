import './statistics.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';
import Audio from '../../../hints/hints-view/audio/audio';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';
import Category from './category/category';

export default class Statistics extends Div {
  continueButton: Div;

  correctSentenses: Div;

  wrongSentenses: Div;

  level: number;

  round: number;

  constructor(level: number, round: number, imgSrc: string) {
    super({ className: 'statistics' });

    const image = new BaseElement<HTMLImageElement>({
      tag: 'img',
      className: 'image',
      src: imgSrc,
    });

    this.level = level;
    this.round = round;

    this.correctSentenses = new Category('I know');
    this.wrongSentenses = new Category("I don't know");
    this.continueButton = new Div({
      className: 'continue-button',
      content: 'Continue',
    });

    this.continueButton.addListener('click', this.continue);

    this.appendChildren(
      image,
      this.correctSentenses,
      this.wrongSentenses,
      this.continueButton
    );

    this.addCategoryListeners();
  }

  private addCategoryListeners() {
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

  private continue = () => {
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

  private addSentenceCorrect = (string: string, audioSrc: string) => {
    const sentense = new Div(
      { content: string, className: 'sentense' },
      new Audio(audioSrc)
    );
    this.correctSentenses.append(sentense);
  };

  private addSentenceWrong = (string: string, audioSrc: string) => {
    const sentense = new Div(
      { content: string, className: 'sentense' },
      new Audio(audioSrc)
    );
    this.wrongSentenses.append(sentense);
  };

  private saveAndMarkPassed() {
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
