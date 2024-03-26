import BaseElement from '../../../../../utils/components/base-element';
import Car from '../car/car-view';

export default class SelectButton extends BaseElement {
  car: Car;

  constructor(car: Car) {
    super({ className: ['select-button', 'button'], content: 'Edit' });

    this.car = car;
    this.addListener('click', this.focusOnForm);
  }

  focusOnForm = () => {
    const editForm = document.querySelector('.edit-form');
    if (editForm) {
      editForm.dispatchEvent(
        new CustomEvent('edit-car', {
          bubbles: true,
          detail: {
            id: this.car.id,
            name: this.car.name,
            color: this.car.color,
          },
        })
      );
    }
  };
}
