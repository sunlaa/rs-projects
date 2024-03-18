import Div from '../../../../utilits/base-elements/div-element/div';

export default class BaseSelect extends Div {
  currentOption: Div;

  dropDown: Div;

  constructor(optionCount: number) {
    super({ className: 'select' });

    this.currentOption = new Div({
      className: 'current-option',
    });
    this.dropDown = new Div({ className: 'drop-down' });

    this.updateOption(optionCount);
    this.appendChildren(this.currentOption, this.dropDown);
  }

  updateOption(optionCount: number) {
    this.dropDown.getElement().innerHTML = '';

    for (let i = 0; i < optionCount; i += 1) {
      const option = new Div({
        content: `${i + 1}`,
        className: 'option',
      });
      this.dropDown.append(option);
    }
  }

  addIds(optionCount: number, type: 'round' | 'level') {
    const options = [
      ...this.dropDown.getElement().querySelectorAll<HTMLElement>('.option'),
    ];

    for (let i = 0; i < optionCount; i += 1) {
      options[i].id = `${type}-${i + 1}`;
    }
  }

  getOptions() {
    return [
      ...this.dropDown.getElement().querySelectorAll<HTMLElement>('.option'),
    ];
  }
}
