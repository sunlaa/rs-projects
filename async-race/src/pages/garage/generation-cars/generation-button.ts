import BaseElement from '../../../utils/components/base-element';

export default class GenerationButton extends BaseElement {
  constructor() {
    super({ className: ['generation-button'] });
  }

  static getRandomColor() {
    const red = `${Math.floor(Math.random() * 256)}`;
    const green = `${Math.floor(Math.random() * 256)}`;
    const blue = `${Math.floor(Math.random() * 256)}`;

    const normalize = (val: string) => (val.length < 2 ? `0${val}` : val);

    return `#${normalize(red)}${normalize(green)}${normalize(blue)}`;
  }

  // generation = async () => {

  // }
}
