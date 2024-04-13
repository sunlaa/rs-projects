import BaseElement from '@/utils/components/base-element';

export default class Hint extends BaseElement {
  requirementList: BaseElement;

  constructor(input: 'login' | 'password') {
    super({
      classes: ['authentication-form__hint', 'hint'],
      textContent: 'You should match this requirements:',
    });
    this.requirementList = new BaseElement({
      tag: 'ul',
      classes: ['hint__list'],
    });
    this.createList(input);

    this.append(this.requirementList);
  }

  private createList(input: 'login' | 'password') {
    const li = (textContent: string): BaseElement =>
      new BaseElement({ tag: 'li', textContent });

    switch (input) {
      case 'login': {
        this.requirementList.appendChildren(
          li('The English letters'),
          li('First letter in uppercase'),
          li('The minimum login length is 3 characters')
        );
        break;
      }
      case 'password': {
        this.requirementList.appendChildren(
          li('The English letters'),
          li('At least one upper-case letter'),
          li('The minimum password length is 4 characters')
        );
        break;
      }
      default: {
        break;
      }
    }
  }
}
