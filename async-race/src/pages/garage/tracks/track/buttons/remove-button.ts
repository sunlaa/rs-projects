import BaseElement from '../../../../../utils/components/base-element';
import Car from '../car/car-view';

export default class RemoveButton extends BaseElement {
  car: Car;

  constructor(car: Car) {
    super({ className: ['remove', 'button'], content: 'Remove' });

    this.car = car;

    this.addListener('click', this.removeCar);
  }

  private removeCar = () => {
    this.car.removeCar();
    const editForm = document.querySelector('.edit-form');
    if (editForm) {
      editForm.dispatchEvent(new CustomEvent('clear-for-removed'));
    }
  };
}
