import BaseElement from '../../../utils/components/base-element';
import Pagination from '../../../utils/components/page-elements/pagination';
import { WinnersData } from '../../../utils/types/types';
import HeadRow from './row/head-row';
import Row from './row/row';

export default class WinTable extends BaseElement<HTMLTableElement> {
  tbody: BaseElement = new BaseElement({ tag: 'tbody' });

  headRow: HeadRow;

  constructor(page: Pagination) {
    super({ tag: 'table', className: ['win-table'] });

    this.headRow = new HeadRow(page);
    this.appendChildren(this.headRow, this.tbody);

    this.addListener('sort-table', (event) => {
      const customEvent = event as CustomEvent;
      const { data } = customEvent.detail;
      this.redrawTable(data);
    });
  }

  redrawTable = (data: WinnersData) => {
    this.tbody.getElement().innerHTML = '';
    data.forEach((elem, i) => {
      this.tbody.append(new Row(elem, i));
    });
  };

  static updateTable() {
    const winnerPage = document.querySelector('.winners');
    if (winnerPage) {
      winnerPage.dispatchEvent(new CustomEvent('update-table'));
    }
  }
}
