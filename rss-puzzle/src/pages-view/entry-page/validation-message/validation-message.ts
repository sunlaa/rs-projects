import { BaseElement } from '../../../utilits/base-elements/base-element';
import Div from '../../../utilits/base-elements/div-element/div';

export default class ValidationMessage extends Div {
  requirementList: BaseElement<HTMLUListElement>;

  constructor(input: 'name' | 'surname') {
    super({
      className: 'input-message',
      content: `You should match this requirements:`,
    });

    this.requirementList = new BaseElement<HTMLUListElement>(
      { tag: 'ul' },
      new BaseElement<HTMLLIElement>({
        tag: 'li',
        content: 'First letter in uppercase',
      }),
      new BaseElement<HTMLLIElement>({
        tag: 'li',
        content: 'Only English letters and hyphens are allowed',
      })
    );

    this.createMessage(input);
    this.append(this.requirementList);
  }

  createMessage(input: 'name' | 'surname') {
    const li: BaseElement<HTMLLIElement> = new BaseElement<HTMLLIElement>({
      tag: 'li',
    });
    if (input === 'name') {
      li.setContent('The minimum length for a name is 3 characters');
      this.addClass('name');
    } else {
      li.setContent('The minimum length for a surname is 4 characters');
      this.addClass('surname');
    }
    this.requirementList.append(li);
  }
}
