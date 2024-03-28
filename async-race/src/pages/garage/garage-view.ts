import BaseElement from '../../utils/components/base-element';
import CreateRedoBlock from './create-redo-field/create-redo';
import GenerationButton from './generation-cars/generation-button';
import RaceButtons from './race/race-buttons';
import TracksPage from './tracks/tracks-page';

export default class Garage extends BaseElement {
  constructor() {
    super({ tag: 'section', className: ['garage'] });

    const createRedoBlock = new CreateRedoBlock();
    const interactWithCars = new BaseElement(
      {
        className: ['interact-with-cars'],
      },
      new RaceButtons(),
      new GenerationButton()
    );

    const tracksPage = new TracksPage();

    this.appendChildren(createRedoBlock, interactWithCars, tracksPage);
  }
}
