import './tracks.css';
import { CarsData } from '../../../utils/types/types';
import Car from './track/car/car-view';
import Track from './track/track';
import Pagination from './pagination/pagination';
import BaseElement from '../../../utils/components/base-element';
import PageTurns from './pagination/page-turns';

export default class Tracks extends BaseElement {
  pagination: Pagination;

  pageTurns: PageTurns;

  constructor(pagination: Pagination) {
    super({ tag: 'div', className: ['tracks'] });

    this.pagination = pagination;

    this.pageTurns = new PageTurns();
    this.addTurnsListener();
  }

  renderCars(pageNum: number) {
    this.element.innerHTML = '';
    // Fix when all cars are removed!!

    const index = this.pagination.render(pageNum);

    const carsData: CarsData = this.pagination.carsData.slice(
      index.start,
      index.end
    );

    carsData.forEach((carData) => {
      const track = new Track(new Car(carData));
      this.append(track);
    });
  }

  private prev = () => {
    this.pagination.prev();

    this.renderCars(this.pagination.currentPage);
  };

  private next = () => {
    this.pagination.next();
    this.renderCars(this.pagination.currentPage);
  };

  private addTurnsListener() {
    const { prev } = this.pageTurns;
    const { next } = this.pageTurns;

    prev.addListener('click', this.prev);
    next.addListener('click', this.next);
  }
}
