import BaseElement from '../../../../utils/components/base-element';
import { CarsData } from '../../../../utils/types/types';
import Tracks from '../tracks';
import PageCounter from './page-counter';
import PageTurns from './page-turns';

export default class Pagination extends BaseElement {
  carsData: CarsData;

  tracks: Tracks;

  pageCounter: PageCounter;

  pageTurns: PageTurns;

  currentPage: number = 0;

  constructor(carsData: CarsData, tracks: Tracks, pageCounter: PageCounter) {
    super({ className: ['pagination'] });

    this.carsData = carsData;
    this.tracks = tracks;
    this.pageCounter = pageCounter;

    this.pageTurns = new PageTurns();
    const { prev } = this.pageTurns;
    const { next } = this.pageTurns;

    prev.addListener('click', this.prev);
    next.addListener('click', this.next);

    this.appendChildren(tracks.getElementView());
    this.render(0);
  }

  getPagesCount() {
    return Math.floor(this.carsData.length / 7);
  }

  render(pageNum: number) {
    const startIndex = pageNum * 7;
    const endIndex = startIndex + 7;
    this.tracks.updateCars(this.carsData.slice(startIndex, endIndex));
    this.pageCounter.setPage(`Page №${this.currentPage + 1}`);
  }

  next = () => {
    this.currentPage += 1;
    if (this.currentPage > this.getPagesCount()) {
      this.currentPage = 0;
    }
    this.render(this.currentPage);
  };

  prev = () => {
    this.currentPage -= 1;
    if (this.currentPage < 0) {
      this.currentPage = this.getPagesCount();
    }
    this.render(this.currentPage);
  };
}
