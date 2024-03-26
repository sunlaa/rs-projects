import View from '../../utils/components/base-view';
import CreateForm from './create-redo-field/create/create-form';
import EditForm from './create-redo-field/edit/edit-form';
import TracksPage from './tracks/tracks-page';

export default class Garage extends View {
  constructor() {
    super({ className: ['garage'] });

    const create = new CreateForm();
    const edit = new EditForm();

    const tracksPage = new TracksPage();
    tracksPage.drawTracks(0);

    this.view.appendChildren(create, edit, tracksPage);
  }
}
