import { BaseElement } from '../../../utilits/base-elements/base-element';
import Label from './label/label';
import Div from '../../../utilits/base-elements/div-element/div';

class Form extends BaseElement<HTMLFormElement> {
  constructor() {
    const nameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'userName',
      minLength: 3,
      pattern: '^[A-Z][\\-a-zA-z]+$',
      autocomplete: 'off',
    });
    const surnameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'userSurname',
      minLength: 4,
      pattern: '^[A-Z][\\-a-zA-z]+$',
      autocomplete: 'off',
    });
    super(
      { tag: 'form', className: 'form' },
      new Div(
        { className: 'label' },
        new Label({ content: 'Your Name: ' }, nameInput)
      ),
      new Div(
        { className: 'label' },
        new Label({ content: 'Your Surname: ' }, surnameInput)
      ),
      new Div(
        { className: 'submit' },
        new BaseElement<HTMLInputElement>({
          tag: 'input',
          type: 'submit',
          value: 'Login',
        })
      )
    );
  }
}

export default Form;
