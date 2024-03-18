import './select-menu.css';
import Div from '../../../utilits/base-elements/div-element/div';
import BaseSelect from './base-select/base-select';
import { sources } from '../game-logic/user-select';
import RoundView from '../game-space/round-view/round-view';
import { BaseElement } from '../../../utilits/base-elements/base-element';
import { LocalStorage } from '../../../utilits/servises/local-storage';

const levelCount = sources.length;

export default class SelectMenu extends Div {
  levelSelect: BaseSelect;

  roundSelect: BaseSelect;

  roundView: RoundView | null;

  level: number;

  page: BaseElement;

  constructor(page: BaseElement) {
    super({
      className: 'selection-menu',
      styles: {
        alignSelf: 'flex-start',
      },
    });

    this.page = page;
    this.level = 1;

    this.levelSelect = new BaseSelect(levelCount);
    this.roundSelect = new BaseSelect(sources[0].roundsCount);
    this.roundSelect.addIds(sources[0].roundsCount);

    this.roundView = null;

    this.firstRender();

    this.levelSelect.dropDown.addListener('click', this.chooseLevel);
    this.roundSelect.dropDown.addListener('click', this.chooseRound);

    this.appendChildren(this.levelSelect, this.roundSelect);
  }

  private firstRender() {
    const userLevel = LocalStorage.get('level-data');

    if (userLevel) {
      const { level, round } = this.getCorrectRound(
        +userLevel.level,
        +userLevel.round + 1
      );

      this.roundView = new RoundView(level, round);

      this.updateValue(`${level}`, `${round}`);
    } else {
      this.roundView = new RoundView(1, 1);
      this.updateValue('1', '1');
    }

    this.page.append(this.roundView);
  }

  private updateValue(level: string, round: string) {
    this.levelSelect.currentOption.setContent(`Level ${level}`);
    this.roundSelect.currentOption.setContent(`Round ${round}`);
  }

  private chooseLevel = (event: Event) => {
    const clickedOption = event.target as HTMLElement;
    if (!clickedOption) throw new Error('No options');

    this.level = Number(clickedOption.textContent);
    const roundCount = sources[this.level - 1].roundsCount;

    this.updateRoundList(roundCount);
    this.drawRound(this.level, 1);
  };

  private chooseRound = (event: Event) => {
    const clickedOption = event.target as HTMLElement;
    if (!clickedOption) throw new Error('No options');

    const round = Number(clickedOption.textContent);
    this.drawRound(this.level, round);
  };

  private updateRoundList(roundCount: number) {
    this.roundSelect.updateOption(roundCount);
    this.roundSelect.addIds(roundCount);
  }

  drawRound(givenLevel: number, gitvenRound: number) {
    if (!this.roundView) throw new Error('No RoundView');
    this.roundView.remove();

    const { level, round } = this.getCorrectRound(givenLevel, gitvenRound);

    this.roundView = new RoundView(level, round);

    this.page.append(this.roundView);
  }

  private getCorrectRound(
    level: number,
    round: number
  ): { level: number; round: number } {
    if (round > sources[level - 1].roundsCount && level === 6) {
      this.updateValue('1', '1');

      return { level: 1, round: 1 };
    }
    if (round > sources[level - 1].roundsCount) {
      this.updateValue(`${level + 1}`, '1');
      return { level: level + 1, round: 1 };
    }
    this.updateValue(`${level}`, `${round}`);

    return { level, round };
  }
}
