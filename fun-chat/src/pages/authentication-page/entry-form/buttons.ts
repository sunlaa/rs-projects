import InfoButton from '@/pages/chat-page/header/nav-button/info-button';
import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';

export default class ButtonsOnStart extends BaseElement {
  constructor() {
    super({ classes: ['authentication-form__buttons'] });
    const submit: Input = new Input({
      type: 'submit',
      id: 'submit',
      value: 'Log in',
      classes: ['button'],
    });

    const info = new InfoButton();

    this.appendChildren(info, submit);
  }
}
