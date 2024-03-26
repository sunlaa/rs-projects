import View from '../../utils/components/base-view';
import CreateForm from './create-redo-field/create/create';
import TracksPage from './tracks/tracks-page';

export default class Garage extends View {
  constructor() {
    super({ className: ['garage'] });

    const tracksPage = new TracksPage();
    tracksPage.drawTracks(0);

    const create = new CreateForm();

    this.view.appendChildren(create, tracksPage);
  }
}
