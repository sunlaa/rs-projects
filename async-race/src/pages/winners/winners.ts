import './winners.css';
import BaseElement from '../../utils/components/base-element';
import WinTable from './table/table';
import Pagination from '../../utils/components/page-elements/pagination';
import TotalCounter from '../../utils/components/page-elements/total-counter';
import PageCounter from '../../utils/components/page-elements/page-counter';
import PageTurns from '../../utils/components/page-elements/page-turns';
import { WinnersData } from '../../utils/types/types';

export default class Winners extends BaseElement {
  page: Pagination;

  table: WinTable;

  totalCounter: TotalCounter;

  pageCounter: PageCounter;

  pageTurns: PageTurns;

  constructor() {
    super({ tag: 'section', className: ['winners'] });

    this.table = new WinTable();

    this.page = new Pagination('winners', 10, 'Winners');
    this.totalCounter = this.page.totalCounter;
    this.pageCounter = this.page.pageCounter;
    this.pageTurns = this.page.pageTurns;
    this.addTurnListeners();

    this.updatePage();

    this.appendChildren(
      this.totalCounter,
      this.pageCounter,
      this.table,
      this.pageTurns
    );
  }

  private addTurnListeners() {
    this.pageTurns.prev.addListener('click', this.prev);
    this.pageTurns.next.addListener('click', this.next);
  }

  updatePage = async () => {
    this.table.tbody.getElement().innerHTML = '';

    const data = (await this.page.getDataForPageDraw()) as WinnersData;
    this.totalCounter.updateCounter(this.page.totalEntities);
    this.pageCounter.updatePage(this.page.currentPage);
    this.table.redrawTable(data);
  };

  private prev = () => {
    this.page.prev();
    this.updatePage();
  };

  private next = async () => {
    await this.page.next();
    this.updatePage();
  };
}
