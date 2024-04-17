import BaseElement from '@/utils/components/base-element';
import Input from '@/utils/components/input';
import Label from '@/utils/components/label';
import { loginRegExp, passwordRegExp } from '@/utils/types/types';
import Hint from './hint';

export default class InputField extends BaseElement {
  input: Input;

  hint: BaseElement;

  constructor(label: Label, hint: Hint) {
    super({ classes: ['authentication-form__field'] });

    this.input = label.input;
    this.hint = hint;

    this.input.addListener('input', this.showDemands);

    this.appendChildren(label, hint);
  }

  showDemands = (event: Event) => {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const { value } = input;

      switch (input.id) {
        case 'login': {
          if (
            !loginRegExp.test(value) ||
            !(value.length > 2) ||
            !(value.length < 16)
          ) {
            this.hint.addClass('visible');
          } else {
            this.hint.removeClass('visible');
          }

          break;
        }
        case 'password': {
          if (passwordRegExp.test(value) && value.length > 3) {
            this.hint.removeClass('visible');
          } else {
            this.hint.addClass('visible');
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  };
}
