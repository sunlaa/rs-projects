import BaseElement from '../../../../utils/components/base-element';

export default class TotalCount extends BaseElement {
  constructor(carsCount: number) {
    super({
      className: ['total-car-counter'],
      content: `Total Cars: ${carsCount}`,
    });
  }
}
