import { BaseElement } from '../../../utilits/base-elements/base-element';
import Label from './label/label';
import Div from '../../../utilits/base-elements/div-element/div';
import {
  LocalStorage,
  LocalData,
} from '../../../utilits/servises/local-storage';

class Form extends BaseElement<HTMLFormElement> {
  userData: LocalData;

  constructor() {
    const nameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'user-name',
      minLength: 3,
      pattern: '^[A-Z][\\-a-zA-z]+$',
      autocomplete: 'off',
    });
    const surnameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'user-surname',
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

    this.userData = {
      name: '',
      surname: '',
    };

    this.element.addEventListener('submit', this.hundlerSubmit);
  }

  private hundlerSubmit = (event: Event) => {
    event.preventDefault();
    this.getUserData();
    this.saveUserData();
  };

  private getUserData() {
    const dataForm = new FormData(this.getElement());
    this.userData.name = `${dataForm.get('user-name')}`;
    this.userData.surname = `${dataForm.get('user-surname')}`;
  }

  private saveUserData() {
    LocalStorage.save('user-data', this.userData);
  }
}

export default Form;
