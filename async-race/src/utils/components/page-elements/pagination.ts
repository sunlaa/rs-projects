import { CarsData, WinnersData } from '../../types/types';
import PageCounter from './page-counter';
import PageTurns from './page-turns';
import TotalCounter from './total-counter';

export default class Pagination {
  page: 'garage' | 'winners';

  limit: number;

  pageTurns: PageTurns;

  pageCounter: PageCounter;

  currentPage: number = 1;

  totalCounter: TotalCounter;

  totalEntities: string = '';

  constructor(page: 'garage' | 'winners', limit: number, countName: string) {
    this.page = page;
    this.limit = limit;

    this.pageTurns = new PageTurns();
    this.totalCounter = new TotalCounter(countName);
    this.pageCounter = new PageCounter();
  }

  async getDataForPageDraw() {
    const response = await fetch(
      `http://127.0.0.1:3000/${this.page}?_limit=${this.limit}&_page=${this.currentPage}`
    );
    const totalCount = response.headers.get('X-Total-Count');
    if (totalCount) this.totalEntities = totalCount;
    const data: CarsData | WinnersData = await response.json();
    return data;
  }

  prev = () => {
    this.currentPage -= 1;
    if (this.currentPage <= 0) this.currentPage = 1;
  };

  next = async () => {
    this.currentPage += 1;
    const newData = await this.getDataForPageDraw();
    if (newData.length === 0) {
      this.currentPage -= 1;
    }
  };
}
