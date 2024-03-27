import { CarsData, CarsOnPageData } from '../../../../utils/types/types';
import PageCounter from './page-counter';

export default class Pagination {
  carsData: CarsData;

  pageCounter: PageCounter;

  currentPage: number = 0;

  constructor(carsData: CarsData) {
    this.carsData = carsData;
    this.pageCounter = new PageCounter();
  }

  getPagesCount() {
    return Math.ceil(this.carsData.length / 7);
  }

  render(pageNum: number): CarsOnPageData {
    this.currentPage = pageNum;
    const startIndex = pageNum * 7;
    const endIndex = startIndex + 7;
    this.pageCounter.setPage(`Page ${this.currentPage + 1}`);
    return { start: startIndex, end: endIndex };
  }

  next() {
    this.currentPage += 1;
    const pagesCount = this.getPagesCount();
    if (this.currentPage > pagesCount - 1 || this.carsData.length === 0) {
      this.currentPage = 0;
    }
  }

  prev() {
    this.currentPage -= 1;
    const pagesCount = this.getPagesCount();
    if (this.currentPage < 0) {
      this.currentPage = pagesCount - 1;
    }
    if (this.carsData.length === 0) this.currentPage = 0;
  }
}
