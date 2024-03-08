import { BaseElement } from '../../../utilits/base-elements/base-element';
import nonNullable from '../../../utilits/check-functions/non-nulable';
import { LocalStorage } from '../../../utilits/servises/local-storage';

class Greet extends BaseElement {
  name: string;

  surname: string;

  constructor() {
    super({ tag: 'h1', className: 'greeting' });

    this.name = '';
    this.surname = '';

    this.setUserData();
    this.setContent(`Hello there, ${this.name} ${this.surname}!!!`);
  }

  setUserData() {
    const objData = LocalStorage.get('user-data');
    if (nonNullable(objData)) {
      this.name = objData.name;
      this.surname = objData.surname;
    }
  }
}

export default Greet;
