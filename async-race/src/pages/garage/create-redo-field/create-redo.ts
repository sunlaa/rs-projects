import './create-redo.css';

import BaseElement from '../../../utils/components/base-element';
import CreateForm from './create/create-form';
import EditForm from './edit/edit-form';

export default class CreateRedoBlock extends BaseElement {
  constructor() {
    super(
      { className: ['create-redo-fields'] },
      new CreateForm(),
      new EditForm()
    );
  }
}
