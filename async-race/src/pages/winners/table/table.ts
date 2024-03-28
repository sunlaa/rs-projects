import BaseElement from '../../../utils/components/base-element';
import { WinnersData } from '../../../utils/types/types';
import HeadRow from './row/head-row';
import Row from './row/row';

export default class WinTable extends BaseElement<HTMLTableElement> {
  winners: WinnersData;

  tbody: BaseElement;

  constructor(winners: WinnersData) {
    super({ tag: 'table', className: ['table'] });

    this.winners = winners;
    this.tbody = new BaseElement({ tag: 'tbody' });
    this.appendChildren(new HeadRow(), this.tbody);
    this.redrawTable(winners);
  }

  redrawTable(data: WinnersData) {
    this.tbody.getElement().innerHTML = '';
    data.forEach((elem) => {
      this.tbody.append(new Row(elem));
    });
  }
}
