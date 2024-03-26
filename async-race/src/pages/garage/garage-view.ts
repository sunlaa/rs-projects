import BaseElement from '../../utils/components/base-element';
import CreateForm from './create-redo-field/create/create-form';
import EditForm from './create-redo-field/edit/edit-form';
import TracksPage from './tracks/tracks-page';

export default class Garage extends BaseElement {
  constructor() {
    super({ tag: 'section', className: ['garage'] });

    const create = new CreateForm();
    const edit = new EditForm();

    const tracksPage = new TracksPage();
    tracksPage.drawTracks(0);

    this.appendChildren(create, edit, tracksPage);
  }
}
