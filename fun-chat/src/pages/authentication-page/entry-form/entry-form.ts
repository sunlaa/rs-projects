import '../authentication.css';
import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import ws, { WSocket } from '@/web-socket/web-socket';
import Router from '@/utils/services/router';
import UserPage from '@/pages/chat-page/main/user-page';
import { loginRegExp, passwordRegExp } from '@/utils/types/types';
import InputField from './input-field';
import Hint from './hint';
import ErrorMessage from './error-message';

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

  errorContainer: BaseElement = new BaseElement({
    className: ['authentication-form_error-container'],
  });

  router: Router;

  constructor(router: Router) {
    super({ tag: 'form', className: ['authentication-form'] });

    this.addListener('submit', this.getEntryData);
    this.appendChildren(
      this.login,
      this.password,
      this.submit,
      this.errorContainer
    );

    this.router = router;
  }

  update(socket: WSocket) {
    const message = new ErrorMessage(socket.loginErorr);
    message.showMessage(this.errorContainer);
  }

  static validate(login: string, password: string): boolean {
    return (
      login.length > 2 &&
      loginRegExp.test(login) &&
      password.length > 8 &&
      passwordRegExp.test(password)
    );
  }

  getEntryData() {
    const login = this.login.input.getData();
    const password = this.password.input.getData();

    return { login, password };
  }

  entry = (event: Event) => {
    event.preventDefault();
    const userData = this.getEntryData();
    const { login } = userData;
    const { password } = userData;
    const userPage = new UserPage(login);

    ws.attach(this);
    ws.attach(userPage);
    if (AuthenticationForm.validate(login, password)) {
      ws.log(login, password, this.router);
    }
  };
}
