import BaseElement from "../../../../../utils/components/base-element";

export default class CarName extends BaseElement {
  constructor(name: string) {
    super({className: ['car-name'], content: name})
  }
}