import BaseElement from '../../../../utils/components/base-element';

export default class Input extends BaseElement<HTMLInputElement> {
  constructor(type: string, name?: string) {
    super({ tag: 'input', type, name });
  }
}
