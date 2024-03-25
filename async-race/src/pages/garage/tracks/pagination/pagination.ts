import BaseElement from '../../../../utils/components/base-element';
import { CarsData } from '../../../../utils/types/types';
import CarLogic from '../track/car/car-logic';
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

  async getPagesCount() {
    const data = await CarLogic.getAllCars();
    if (data) this.carsData = data;
    return Math.ceil(this.carsData.length / 7);
  }

  render(pageNum: number) {
    const startIndex = pageNum * 7;
    const endIndex = startIndex + 7;
    this.tracks.updateCars(this.carsData.slice(startIndex, endIndex));
    this.pageCounter.setPage(`Page №${this.currentPage + 1}`);
  }

  next = async () => {
    this.currentPage += 1;
    const pagesCount = await this.getPagesCount();
    if (this.currentPage > pagesCount - 1) {
      this.currentPage = 0;
    }
    this.render(this.currentPage);
  };

  prev = async () => {
    this.currentPage -= 1;
    const pagesCount = await this.getPagesCount();
    if (this.currentPage < 0) {
      this.currentPage = pagesCount - 1;
    }
    this.render(this.currentPage);
  };
}
