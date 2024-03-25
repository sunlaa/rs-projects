import BaseElement from '../../../utils/components/base-element';
import PageCounter from './pagination/page-counter';
import Pagination from './pagination/pagination';
import CarLogic from './track/car/car-logic';
import Tracks from './tracks';

export default class TracksPage extends BaseElement {
  pageCounter: PageCounter = new PageCounter();

  constructor() {
    super({ className: ['tracks-page'] });

    const draw = this.drawTracks.bind(this);

    this.addListener('change-server-data', (event) => {
      const customEvent = event as CustomEvent;
      const { pageNum } = customEvent.detail;
      draw(pageNum);
    });
  }

  drawTracks = async (pageNum: number) => {
    this.element.innerHTML = '';

    const carsData = await CarLogic.getAllCars();

    const page = new Pagination(carsData, new Tracks());
    this.pageCounter = page.pageCounter;
    const pageTurn = page.pageTurns;

    page.render(pageNum);

    this.appendChildren(this.pageCounter, page, pageTurn);
  };
}
