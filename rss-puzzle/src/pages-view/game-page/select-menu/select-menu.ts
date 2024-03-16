import './select-menu.css';
import Div from '../../../utilits/base-elements/div-element/div';
import BaseSelect from './base-select/base-select';
import { sources } from '../game-logic/user-select';
import RoundView from '../game-space/round-view/round-view';
import { BaseElement } from '../../../utilits/base-elements/base-element';
import { LocalStorage } from '../../../utilits/servises/local-storage';

const levelCount = sources.length;

export default class SelectMenu extends Div {
  levelSelect: HTMLSelectElement;

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

    this.levelSelect = new BaseSelect(levelCount).getElement();
    this.roundSelect = new BaseSelect(sources[0].roundsCount);

    this.roundView = null;

    this.firstRender();

    this.levelSelect.addEventListener('change', this.chooseLevel);
    this.roundSelect.addListener('change', this.chooseRound);

    this.appendChildren(this.levelSelect, this.roundSelect);
  }

  private firstRender() {
    const userLevel = LocalStorage.get('level-data');

    if (userLevel) {
      this.roundView = new RoundView(+userLevel.level, +userLevel.round);

      this.updateValue(userLevel.level, userLevel.round);
    } else {
      this.roundView = new RoundView(1, 1);
    }

    this.page.append(this.roundView);
  }

  private updateValue(level: string, round: string) {
    this.levelSelect.value = level;
    this.roundSelect.getElement().value = round;
  }

  private chooseLevel = () => {
    this.level = +this.levelSelect.value;
    const roundCount = sources[this.level - 1].roundsCount;

    this.updateRoundList(roundCount);
    this.drawRound(this.level, 1);
  };

  private chooseRound = () => {
    const round = +this.roundSelect.getElement().value;
    this.drawRound(this.level, round);
  };

  private updateRoundList(roundCount: number) {
    this.roundSelect.updateOption(roundCount);
  }

  drawRound(level: number, round: number) {
    if (!this.roundView) throw new Error('No RoundView');
    this.roundView.remove();

    if (round > sources[level - 1].roundsCount && level === 6) {
      this.roundView = new RoundView(1, 1);

      this.updateValue('1', '1');
    } else if (round > sources[level - 1].roundsCount) {
      this.roundView = new RoundView(level + 1, 1);

      this.updateValue(`${level + 1}`, '1');
    } else {
      this.roundView = new RoundView(level, round);

      this.updateValue(`${level}`, `${round}`);
    }

    this.page.append(this.roundView);
  }
}
