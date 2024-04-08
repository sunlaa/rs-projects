import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import Hint from '../hint';

export default class InputField extends BaseElement {
  input: Input;

  hint: BaseElement;

  loginRegExp = /^[A-Z]/;

  passwordRegExp = /.*[A-Z].*/;

  constructor(label: Label, hint: Hint) {
    super({ className: ['authentication-form__field'] });

    this.input = label.input;
    this.hint = hint;

    this.input.addListener('input', this.showDemands);

    this.appendChildren(label, hint);
  }

  showDemands = (event: Event) => {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const { value } = input;

      switch (input.name) {
        case 'login': {
          if (this.loginRegExp.test(value) && value.length > 3) {
            this.hint.removeClass('visible');
          }
          break;
        }
        case 'password': {
          if (this.passwordRegExp.test(value) && value.length > 8) {
            this.hint.removeClass('visible');
          }
          break;
        }
        default: {
          this.hint.addClass('visible');
        }
      }
    }
  };
}
