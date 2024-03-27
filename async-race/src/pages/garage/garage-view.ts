import BaseElement from '../../utils/components/base-element';
import CreateRedoBlock from './create-redo-field/create-redo';
import RaceButton from './race/race-buttons';
import TracksPage from './tracks/tracks-page';

export default class Garage extends BaseElement {
  constructor() {
    super({ tag: 'section', className: ['garage'] });

    const createRedoBlock = new CreateRedoBlock();
    const raceButton = new RaceButton();

    const tracksPage = new TracksPage();
    tracksPage.drawTracks(0);

    this.appendChildren(createRedoBlock, raceButton, tracksPage);
  }
}
