import BaseElement from '../../../../utils/components/base-element';
import Cell from '../ceil/ceil';
import Pagination from '../../../../utils/components/page-elements/pagination';
import { WinnersData } from '../../../../utils/types/types';

export default class HeadRow extends BaseElement<HTMLTableRowElement> {
  wins: Cell = new Cell('Wins', 'th');

  time: Cell = new Cell('Best time', 'th');

  page: Pagination;

  constructor(page: Pagination) {
    super({ tag: 'tr' });

    this.page = page;
    this.fillRow();

    this.wins.addClass('sort-cell');
    this.time.addClass('sort-cell');

    this.wins.addClass('no-sort');
    this.time.addClass('no-sort');

    this.wins.addListener('click', () => {
      this.sort(this.wins, this.time, 'wins');
    });

    this.time.addListener('click', () => {
      this.sort(this.time, this.wins, 'time');
    });
  }

  fillRow() {
    const place = new Cell('Number', 'th');
    const car = new Cell('Car', 'th');
    const name = new Cell('Name', 'th');

    this.appendChildren(place, car, name, this.wins, this.time);
  }

  async getURLForSort(sortColumn: 'wins' | 'time', sortOrder: 'ASC' | 'DESC') {
    this.page.updateURL();
    const { currentURL } = this.page;
    this.page.currentURL = `${currentURL}&_sort=${sortColumn}&_order=${sortOrder}`;
  }

  async redraw() {
    const data = (await this.page.getDataForPageDraw()) as WinnersData;
    const table = this.element.parentElement;
    if (table) {
      table.dispatchEvent(new CustomEvent('sort-table', { detail: { data } }));
    }
  }

  sort = async (
    sortCell: Cell,
    secondSortCell: Cell,
    columnName: 'wins' | 'time'
  ) => {
    if (sortCell.containClass('asc')) {
      sortCell.removeClass('asc');
      sortCell.addClass('no-sort');
      this.page.updateURL();
    } else if (sortCell.containClass('desc')) {
      sortCell.removeClass('desc');
      sortCell.addClass('asc');
      this.getURLForSort(columnName, 'ASC');
    } else if (sortCell.containClass('no-sort')) {
      sortCell.removeClass('no-sort');
      sortCell.addClass('desc');
      this.getURLForSort(columnName, 'DESC');
    }
    secondSortCell.removeClass('asc');
    secondSortCell.removeClass('desc');
    secondSortCell.addClass('no-sort');

    await this.redraw();
  };
}
