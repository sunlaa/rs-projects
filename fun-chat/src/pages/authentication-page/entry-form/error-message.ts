import BaseElement from '@/utils/components/base-element';

export default class ErrorMessage extends BaseElement {
  constructor(textContent: string) {
    super({ textContent, className: ['authentication-form__error'] });
  }

  showMessage(container: BaseElement) {
    container.removeChildren();
    container.append(this);
  }
}
