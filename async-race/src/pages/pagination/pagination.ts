import BaseElement from '../../utils/components/base-element';
import { CarsData } from '../../utils/types/types';
import Tracks from '../garage/tracks/tracks';
import PageCounter from './page-counter';

export default class Pagination extends BaseElement {
  carsData: CarsData;

  tracks: Tracks;

  pageCounter: PageCounter;

  currentPage: number = 0;

  constructor(carsData: CarsData, tracks: Tracks, pageCounter: PageCounter) {
    super({ className: ['pagination'] });

    this.carsData = carsData;
    this.tracks = tracks;
    this.pageCounter = pageCounter;

    const prev = new BaseElement({
      content: 'prev',
      styles: { userSelect: 'none' },
    });
    const next = new BaseElement({
      content: 'next',
      styles: { userSelect: 'none' },
    });
    prev.addListener('click', this.prev);
    next.addListener('click', this.next);

    this.appendChildren(prev, next, tracks.getElementView());
    this.render(0);
  }

  getPagesCount() {
    return Math.floor(this.carsData.length / 7);
  }

  render(pageNum: number) {
    const startIndex = pageNum * 7;
    const endIndex = startIndex + 7;
    this.tracks.updateCars(this.carsData.slice(startIndex, endIndex));
    this.pageCounter.setPage(`${this.currentPage + 1}`);
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
