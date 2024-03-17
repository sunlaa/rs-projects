import Div from '../../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../../utilits/servises/local-storage';
import { sources } from '../../../../game-logic/user-select';

export default class CheckButton extends Div {
  lines: Div[];

  currentLine: Div;

  count: number;

  level: number;

  round: number;

  constructor(lines: Div[], level: number, round: number) {
    super({ className: 'check-button', content: 'Check' });

    this.level = level;
    this.round = round;

    this.lines = lines;
    this.count = 0;

    this.currentLine = this.lines[this.count];

    this.addClass('disabled');

    this.addListener('click', this.showCheck);

    this.addListener('check', () => {
      this.check();
    });
  }

  check = () => {
    const isAllCorrect = !this.getIncorrectPlaces().includes(false);

    if (isAllCorrect) {
      const rightPieces = this.getRightLine();
      rightPieces.forEach((elem) => {
        if (elem instanceof HTMLElement) {
          this.currentLine.append(elem);
        }
      });
      this.currentLine.setStyles({ pointerEvents: 'none' });

      this.element.dispatchEvent(
        new CustomEvent('to-continue', {
          bubbles: true,
          detail: { count: this.count, level: this.level, round: this.round },
        })
      );

      this.addTotheStatistics();
      this.endOfRound();
    }
  };

  private endOfRound() {
    if (this.count === 9) {
      const field = document.querySelector<HTMLElement>('.result-block');
      if (field) {
        field.dispatchEvent(new Event('end-of-round'));
      }

      this.element.dispatchEvent(
        new Event('show-result-button', { bubbles: true })
      );
    }
  }

  private addTotheStatistics() {
    const currentData =
      sources[this.level - 1].rounds[this.round - 1].words[this.count];
    const sentense = currentData.textExample;
    const audioSrc = currentData.audioExample;

    const statistic = document.querySelector<HTMLElement>('.statistics');

    if (statistic) {
      statistic.dispatchEvent(
        new CustomEvent('add-correct', {
          bubbles: true,
          detail: {
            sentense,
            audioSrc,
          },
        })
      );
    }
  }

  private getIncorrectPlaces(): boolean[] {
    const userLine = this.getUserLine();
    const rightLine = this.getRightLine();

    const isCorrectArr = userLine.map((_, i) => {
      const isImageHint = LocalStorage.get('hints-data')?.image === 'true';
      return isImageHint
        ? userLine[i].id === rightLine[i].id
        : userLine[i].textContent === rightLine[i].textContent;
    });

    return isCorrectArr;
  }

  private showCheck = () => {
    const userLine = this.getUserLine();
    const places = this.getIncorrectPlaces();

    userLine.forEach((elem, i) => {
      const wrapper = elem as HTMLElement;
      const piece = wrapper.querySelector<HTMLElement>('.piece');

      if (!piece) throw new Error('No pices!');

      piece.style.textShadow = places[i]
        ? '1px 1px 10px #00ff00'
        : '1px 1px 10px red';

      setTimeout(() => {
        piece.style.textShadow = '1px 1px 10px #818181';
      }, 3000);
    });
  };

  private getRightLine = (): Element[] => {
    return this.currentLine.getChildren().sort((a, b) => +a.id - +b.id);
  };

  private getUserLine = (): Element[] => {
    return this.currentLine.getChildren();
  };

  public updateCounter() {
    this.count += 1;

    this.currentLine = this.lines[this.count];
  }
}
