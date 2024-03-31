import BaseElement from '../../../../utils/components/base-element';
import { ForRedo, ParamsOmitTag } from '../../../../utils/types/types';
import Input from './input';

export default abstract class Form extends BaseElement<HTMLFormElement> {
  color: Input;

  text: Input;

  submit: Input;

  hint: BaseElement;

  data: ForRedo = {};

  constructor(params?: ParamsOmitTag) {
    super({ tag: 'form', ...params });

    this.color = new Input('color', 'car-color');
    this.color.getElement().value = '#ffffff';
    this.text = new Input('text', 'car-name');
    this.submit = new Input('submit');

    this.hint = new BaseElement({
      className: ['input-hint'],
      content: 'Please enter a name.',
    });
    this.appendChildren(this.text, this.color, this.submit);
  }

  protected getFormData(): ForRedo {
    const formData = new FormData(this.element);
    this.data.color = `${formData.get('car-color')}`;
    this.data.name = `${formData.get('car-name')}`;
    return this.data;
  }

  protected hasName() {
    if (this.data.name === '') {
      return false;
    }
    return true;
  }

  protected off() {
    this.color.disable();
    this.text.disable();
    this.submit.disable();
  }

  protected on() {
    this.color.enable();
    this.text.enable();
    this.submit.enable();
  }

  protected clearField() {
    this.text.getElement().value = '';
  }
}
