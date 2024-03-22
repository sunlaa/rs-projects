import { BaseElement } from '../../../utilits/base-elements/base-element';
import Label from '../../../utilits/base-elements/label/label';
import Div from '../../../utilits/base-elements/div-element/div';
import {
  LocalStorage,
  LocalData,
} from '../../../utilits/servises/local-storage';
import Router from '../../../utilits/servises/router';
import ValidationMessage from '../validation-message/validation-message';

const regExp: RegExp = /^[A-Z][\\-a-zA-z]+$/;

export default class Form extends BaseElement<HTMLFormElement> {
  userData: LocalData;

  router: Router;

  nameInput: BaseElement<HTMLInputElement>;

  surnameInput: BaseElement<HTMLInputElement>;

  nameReq: ValidationMessage;

  surnameReq: ValidationMessage;

  constructor(router: Router) {
    const nameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'user-name',
      autocomplete: 'off',
    });
    const surnameInput = new BaseElement<HTMLInputElement>({
      tag: 'input',
      type: 'text',
      name: 'user-surname',
      autocomplete: 'off',
    });

    const nameReq = new ValidationMessage('name');
    const surnameReq = new ValidationMessage('surname');

    super(
      { tag: 'form', className: 'form' },
      new Div(
        { className: 'label' },
        nameReq,
        new Label({ content: 'Your Name: ' }, nameInput)
      ),
      new Div(
        { className: 'label' },
        surnameReq,
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

    this.nameInput = nameInput;

    this.surnameInput = surnameInput;

    this.nameReq = nameReq;
    this.surnameReq = surnameReq;

    this.router = router;
    this.userData = {
      name: '',
      surname: '',
    };

    this.element.addEventListener('submit', this.hundlerSubmit);
    this.element.addEventListener('input', this.showMessage);
  }

  private hundlerSubmit = (event: Event) => {
    event.preventDefault();
    if (this.check()) {
      this.getUserData();
      this.saveUserData();
      this.moveToStartPage();
    }
  };

  private getUserData() {
    const dataForm = new FormData(this.getElement());
    this.userData.name = `${dataForm.get('user-name')}`;
    this.userData.surname = `${dataForm.get('user-surname')}`;
  }

  private saveUserData() {
    LocalStorage.save('user-data', this.userData);
  }

  private moveToStartPage() {
    this.router.navigate('start-page');
  }

  private showMessage = (event: Event) => {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const { value } = input;
      if (input.name === 'user-name') {
        if (!regExp.test(value) || value.length < 3) {
          this.nameReq.addClass('vissible');
        } else this.nameReq.removeClass('vissible');
      } else if (!regExp.test(value) || value.length < 4) {
        this.surnameReq.addClass('vissible');
      } else {
        this.surnameReq.removeClass('vissible');
      }
    }
  };

  private check() {
    const name = this.nameInput.getElement().value;
    const surname = this.surnameInput.getElement().value;
    if (
      regExp.test(name) &&
      name.length >= 3 &&
      regExp.test(surname) &&
      surname.length >= 4
    ) {
      return true;
    }

    return false;
  }
}
