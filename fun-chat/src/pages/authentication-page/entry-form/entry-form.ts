import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import InputField from './input-field';

export default class AuthenticationForm extends BaseElement<HTMLFormElement> {
  login: InputField = new InputField(
    new Label(new Input({ type: 'text', id: 'login' }), {
      className: ['authentication-form__label'],
      textContent: 'Enter your login: ',
    }),
    new BaseElement({})
  );

  password: InputField = new InputField(
    new Label(new Input({ type: 'password', id: 'password' }), {
      className: ['authentication-form__label'],
      textContent: 'Enter you password: ',
    }),
    new BaseElement({})
  );

  submit: Input = new Input({ type: 'submit', id: 'submit', value: 'Log in' });

  constructor() {
    super({ tag: 'form', className: ['authentication-form'] });
  }
}
