import './tracks-page.css';
import BaseElement from '../../../utils/components/base-element';
import Tracks from './tracks';
import Pagination from '../../../utils/components/page-elements/pagination';
import TotalCounter from '../../../utils/components/page-elements/total-counter';
import PageCounter from '../../../utils/components/page-elements/page-counter';
import PageTurns from '../../../utils/components/page-elements/page-turns';
import { CarsData } from '../../../utils/types/types';

export default class TracksPage extends BaseElement {
  page: Pagination;

  tracks: Tracks;

  totalCounter: TotalCounter;

  pageCounter: PageCounter;

  pageTurns: PageTurns;

  constructor() {
    super({ className: ['tracks-page'] });

    this.tracks = new Tracks();

    this.page = new Pagination('garage', 7, 'Total Cars');
    this.totalCounter = this.page.totalCounter;
    this.pageCounter = this.page.pageCounter;
    this.pageTurns = this.page.pageTurns;

    const draw = this.updateTracks.bind(this);

    this.addListener('change-server-data', draw);

    this.addTurnListeners();

    this.updateTracks();

    this.appendChildren(
      this.totalCounter,
      this.pageCounter,
      this.tracks,
      this.pageTurns
    );
  }

  updateTracks = async () => {
    this.tracks.getElement().innerHTML = '';

    const data = (await this.page.getDataForPageDraw()) as CarsData;
    this.totalCounter.updateCounter(this.page.totalEntities);
    this.pageCounter.updatePage(this.page.currentPage);
    this.tracks.renderCars(data);
  };

  private addTurnListeners() {
    this.pageTurns.prev.addListener('click', this.prev);
    this.pageTurns.next.addListener('click', this.next);
  }

  private prev = () => {
    this.page.prev();
    this.updateTracks();
  };

  private next = async () => {
    await this.page.next();
    this.updateTracks();
  };
}
