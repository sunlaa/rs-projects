import BaseElement from '../../../../utils/components/base-element';
import CarElement from '../../../../utils/components/car-element';

export default class Cell extends BaseElement<HTMLTableCellElement> {
  constructor(content: string | CarElement | number, tag: 'td' | 'th') {
    super({ tag });

    this.fillCell(content);
  }

  fillCell(content: string | CarElement | number) {
    if (typeof content === 'string') {
      this.setContent(content);
    } else if (typeof content === 'number') {
      this.setContent(`${content}`);
    } else {
      this.append(content);
    }
  }
}
