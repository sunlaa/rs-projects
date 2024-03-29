import BaseElement from '../../../../utils/components/base-element';
import Cell from '../ceil/ceil';
import Pagination from '../../../../utils/components/page-elements/pagination';

export default class HeadRow extends BaseElement<HTMLTableRowElement> {
  wins: Cell = new Cell('Wins', 'th');

  time: Cell = new Cell('Best time', 'th');

  page: Pagination;

  constructor(page: Pagination) {
    super({ tag: 'tr' });

    this.page = page;
    this.fillRow();

    this.wins.addClass('no-sort');

    this.addListener('click', this.winsSort);
  }

  fillRow() {
    const place = new Cell('Place', 'th');
    const car = new Cell('Car', 'th');
    const name = new Cell('Name', 'th');

    this.appendChildren(place, car, name, this.wins, this.time);
  }

  async getURLForSort(sortColumn: 'wins' | 'time', sortOrder: 'ASC' | 'DESC') {
    const { currentURL } = this.page;
    this.page.currentURL = `${currentURL}&_sort=${sortColumn}&_order=${sortOrder}`;
  }

  static redrawPage() {
    const winners = document.querySelector('.winners');
    if (winners) {
      winners.dispatchEvent(new CustomEvent('sort-table'));
    }
  }

  winsSort = async () => {
    if (this.wins.containClass('asc')) {
      this.wins.removeClass('asc');
      this.wins.addClass('no-sort');
      this.page.updateURL();
    } else if (this.wins.containClass('desc')) {
      this.wins.removeClass('desc');
      this.wins.addClass('asc');
      this.page.updateURL();
      this.getURLForSort('wins', 'ASC');
    } else if (this.wins.containClass('no-sort')) {
      this.wins.removeClass('no-sort');
      this.wins.addClass('desc');
      this.page.updateURL();
      this.getURLForSort('wins', 'DESC');
    }
    HeadRow.redrawPage();
  };
}
