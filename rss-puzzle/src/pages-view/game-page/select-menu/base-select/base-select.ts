import { BaseElement } from '../../../../utilits/base-elements/base-element';

export default class BaseSelect extends BaseElement<HTMLSelectElement> {
  constructor(optionCount: number) {
    super({
      tag: 'select',
      className: 'select',
    });

    this.updateOption(optionCount);
  }

  updateOption(optionCount: number) {
    this.element.innerHTML = '';

    for (let i = 0; i < optionCount; i += 1) {
      const option = new BaseElement<HTMLOptionElement>({
        content: `${i + 1}`,
        tag: 'option',
        className: 'option',
      });
      option.getElement().value = `${i + 1}`;
      this.append(option);
    }
  }
}
