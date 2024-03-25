import BaseElement from '../../../../utils/components/base-element';
import { ForRedo } from '../../../../utils/types/types';
import Input from './input';

export default class Form extends BaseElement<HTMLFormElement> {
  color: Input;

  text: Input;

  submit: Input;

  data: ForRedo = {};

  constructor() {
    super({ tag: 'form' });

    this.color = new Input('color', 'car-color');
    this.text = new Input('text', 'car-name');
    this.submit = new Input('submit');
    this.appendChildren(this.color, this.text, this.submit);
  }

  getFormData(): ForRedo {
    const formData = new FormData(this.element);
    this.data.color = `${formData.get('car-color')}`;
    this.data.name = `${formData.get('car-name')}`;
    return this.data;
  }
}
