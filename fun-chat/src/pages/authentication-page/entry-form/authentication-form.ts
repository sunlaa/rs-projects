import BaseElement from '@/utils/components/base-element';
import SessionStorage from '@/utils/services/session-storage';
import Title from '@/utils/components/title';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import ws from '@/web-socket/web-socket';
import Router from '@/utils/services/router';
import {
  ResponseLoginErrorData,
  loginRegExp,
  passwordRegExp,
} from '@/utils/types/types';
import InputField from './input-field';
import Hint from './hint';
import ErrorMessage from './error-message';
import ButtonsOnStart from './buttons';

export default class AuthenticationForm extends BaseElement<HTMLFormElement> {
  login: InputField = new InputField(
    new Label(new Input({ type: 'text', id: 'login' }), {
      classes: ['authentication-form__label'],
      textContent: 'Enter your login: ',
    }),
    new Hint('login')
  );

  password: InputField = new InputField(
    new Label(new Input({ type: 'password', id: 'password' }), {
      classes: ['authentication-form__label'],
      textContent: 'Enter you password: ',
    }),
    new Hint('password')
  );

  errorContainer: BaseElement = new BaseElement({
    classes: ['authentication-form_error-container'],
  });

  router: Router;

  constructor(router: Router) {
    super({ tag: 'form', classes: ['entry-page__authentication-form'] });

    const title = new Title('Login', ['authentication-form__title']);

    this.addListener('submit', this.entry);
    this.appendChildren(
      title,
      this.login,
      this.password,
      new ButtonsOnStart(),
      this.errorContainer
    );

    this.router = router;

    ws.socket.addEventListener('message', this.showErrorMessage);
  }

  showErrorMessage = (event: MessageEvent) => {
    const data: ResponseLoginErrorData = JSON.parse(event.data);

    if (data.type === 'ERROR' && data.id === 'user-login') {
      SessionStorage.clear();
      let errorMessage = data.payload.error;
      errorMessage = `${errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}.`;
      const message = new ErrorMessage(errorMessage);
      message.showMessage(this.errorContainer);
    }
  };

  static validate(login: string, password: string): boolean {
    return (
      login.length > 2 &&
      login.length < 16 &&
      loginRegExp.test(login) &&
      password.length > 3 &&
      passwordRegExp.test(password)
    );
  }

  getEntryData = () => {
    const login = this.login.input.value;
    const password = this.password.input.value;

    return { login, password };
  };

  entry = (event: Event) => {
    event.preventDefault();
    const userData = this.getEntryData();
    const { login } = userData;
    const { password } = userData;

    if (AuthenticationForm.validate(login, password)) {
      SessionStorage.save('user-data', { login, password });
      ws.logIn(login, password);
    }
  };
}
