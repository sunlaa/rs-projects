import BaseElement from '../../../utils/components/base-element';
import { WinnersData } from '../../../utils/types/types';
import HeadRow from './row/head-row';
import Row from './row/row';

export default class WinTable extends BaseElement<HTMLTableElement> {
  tbody: BaseElement = new BaseElement({ tag: 'tbody' });

  constructor() {
    super({ tag: 'table', className: ['table'] });
    this.appendChildren(new HeadRow(), this.tbody);
  }

  redrawTable(data: WinnersData) {
    this.tbody.getElement().innerHTML = '';
    data.forEach((elem) => {
      this.tbody.append(new Row(elem));
    });
  }
}
