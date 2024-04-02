import BaseElement from '../../../utils/components/base-element';
import Pagination from '../../../utils/components/page-elements/pagination';
import { WinnersData } from '../../../utils/types/types';
import HeadRow from './row/head-row';
import Row from './row/row';

export default class WinTable extends BaseElement<HTMLTableElement> {
  tbody: BaseElement = new BaseElement({ tag: 'tbody' });

  headRow: HeadRow;

  page: Pagination;

  constructor(page: Pagination) {
    super({ tag: 'table', className: ['win-table'] });

    this.page = page;
    this.headRow = new HeadRow(page);
    this.appendChildren(this.headRow, this.tbody);

    this.addListener('sort-table', (event) => {
      const customEvent = event as CustomEvent;
      const { data } = customEvent.detail;
      this.redrawTable(data);
    });
  }

  redrawTable = async (winData: WinnersData) => {
    const rowsPromises = winData.map(async (data, i) => {
      const place = (this.page.currentPage - 1) * 10 + i;
      const row = new Row();
      await row.fillRow(data, place);
      return row;
    });

    const rows = await Promise.all(rowsPromises);

    this.tbody.getElement().innerHTML = '';
    this.tbody.appendChildren(...rows);
  };

  static updateTable() {
    const winnerPage = document.querySelector('.winners');
    if (winnerPage) {
      winnerPage.dispatchEvent(new CustomEvent('update-table'));
    }
  }
}
