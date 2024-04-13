import BaseElement from '@/utils/components/base-element';

export default class Title extends BaseElement {
  constructor(textContent: string, className: string[]) {
    super({
      tag: 'span',
      className,
      textContent,
    });
  }
}
