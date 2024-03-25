import View from '../../utils/components/base-view';
import { CarsData } from '../../utils/types/types';
import PageCounter from './tracks/pagination/page-counter';
import Pagination from './tracks/pagination/pagination';
import Tracks from './tracks/tracks';

export default class Garage extends View {
  constructor(cars: CarsData) {
    super({ className: ['garage'] });

    const pageCounter = new PageCounter();
    const page = new Pagination(cars, new Tracks(), pageCounter);
    const pageTurn = page.pageTurns;

    this.view.appendChildren(pageCounter, page, pageTurn);
  }
}
