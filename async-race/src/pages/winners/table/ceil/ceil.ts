import BaseElement from '../../../../utils/components/base-element';
import CarElement from '../../../../utils/components/car-element';

export default class Cell extends BaseElement<HTMLTableCellElement> {
  constructor(content: string | CarElement) {
    super({ tag: 'td' });

    this.fillCell(content);
  }

  fillCell(content: string | CarElement) {
    if (typeof content === 'string') {
      this.setContent(content);
    } else {
      this.append(content);
    }
  }
}
