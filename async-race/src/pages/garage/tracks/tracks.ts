import Car from './track/car/car-view';
import Track from './track/track';
import Pagination from './pagination/pagination';
import BaseElement from '../../../utils/components/base-element';
import PageTurns from './pagination/page-turns';

export default class Tracks extends BaseElement {
  pagination: Pagination;

  pageTurns: PageTurns;

  cars: Car[] = [];

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

    const currentCarsData = this.pagination.carsData.slice(
      index.start,
      index.end
    );

    this.cars = [];

    currentCarsData.forEach((carData) => {
      const car = new Car(carData);
      this.cars.push(car);
      const track = new Track(car);
      this.append(track);
    });

    this.updateRaceData();
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

  updateRaceData() {
    const raseButton = document.querySelector('.race-buttons');
    if (raseButton) {
      raseButton.dispatchEvent(
        new CustomEvent('update-race-data', {
          detail: { cars: this.cars },
        })
      );
    }
  }
}
