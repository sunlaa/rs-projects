import BaseElement from '../../../../utils/components/base-element';
import { ForRedo, ParamsOmitTag } from '../../../../utils/types/types';
import Input from './input';

export default class Form extends BaseElement<HTMLFormElement> {
  color: Input;

  text: Input;

  submit: Input;

  data: ForRedo = {};

  constructor(params?: ParamsOmitTag) {
    super({ tag: 'form', ...params });

    this.color = new Input('color', 'car-color');
    this.text = new Input('text', 'car-name');
    this.submit = new Input('submit');
    this.appendChildren(this.text, this.color, this.submit);
  }

  getFormData(): ForRedo {
    const formData = new FormData(this.element);
    this.data.color = `${formData.get('car-color')}`;
    this.data.name = `${formData.get('car-name')}`;
    return this.data;
  }

  off() {
    this.color.disable();
    this.text.disable();
    this.submit.disable();
  }

  on() {
    this.color.enable();
    this.text.enable();
    this.submit.enable();
  }

  clearField() {
    this.text.getElement().value = '';
  }
}
