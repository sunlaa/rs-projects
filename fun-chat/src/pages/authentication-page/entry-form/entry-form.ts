import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import ws from '@/web-socket/web-socket';
import UserPage from '@/pages/main-page/user-page';
import InputField from './input-field';
import Hint from '../hint';

export default class AuthenticationForm extends BaseElement<HTMLFormElement> {
  login: InputField = new InputField(
    new Label(new Input({ type: 'text', id: 'login' }), {
      className: ['authentication-form__label'],
      textContent: 'Enter your login: ',
    }),
    new Hint('login')
  );

  password: InputField = new InputField(
    new Label(new Input({ type: 'password', id: 'password' }), {
      className: ['authentication-form__label'],
      textContent: 'Enter you password: ',
    }),
    new Hint('password')
  );

  submit: Input = new Input({ type: 'submit', id: 'submit', value: 'Log in' });

  constructor() {
    super({ tag: 'form', className: ['authentication-form'] });

    this.addListener('submit', this.getEntryData);
    this.appendChildren(this.login, this.password, this.submit);
  }

  getEntryData = (event: Event) => {
    event.preventDefault();
    if (ws.socket.readyState === WebSocket.OPEN) {
      const login = this.login.input.getData();
      const password = this.password.input.getData();
      const userPage = new UserPage(login);
      ws.attach(userPage);
      ws.log(login, password);
    }
  };
}
