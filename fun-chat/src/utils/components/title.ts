import BaseElement from '@/utils/components/base-element';

export default class Title extends BaseElement {
  constructor(textContent: string, classes: string[]) {
    super({
      tag: 'span',
      classes,
      textContent,
    });
  }
}
