import BaseElement from '../../../utils/components/base-element';
import Pagination from './pagination/pagination';
import TotalCount from './pagination/total-count';
import CarLogic from './track/car/car-logic';
import Tracks from './tracks';

export default class TracksPage extends BaseElement {
  page: Pagination = new Pagination([]);

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

    this.page = new Pagination(carsData);
    const tracks = new Tracks(this.page);
    const totalCounter = new TotalCount(this.page.carsData.length);
    const { pageCounter } = this.page;
    const pageTurn = tracks.pageTurns;

    tracks.renderCars(pageNum);
    tracks.updateRaceData();

    this.appendChildren(totalCounter, pageCounter, tracks, pageTurn);
  };
}
