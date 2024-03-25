import BaseElement from '../../../../../utils/components/base-element';
import Car from '../car/car-view';

export default class RemoveButton extends BaseElement {
  car: Car;

  constructor(car: Car) {
    super({ className: ['remove', 'button'], content: 'Remove' });

    this.car = car;

    this.addListener('click', this.removeCar);
  }

  removeCar = () => {
    this.car.removeCar();
  };
}
