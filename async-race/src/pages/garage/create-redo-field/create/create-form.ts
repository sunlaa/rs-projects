import Car from '../../tracks/track/car/car-view';
import Form from '../form/form';

export default class CreateForm extends Form {
  constructor() {
    super({ className: ['create-form', 'form'] });
    this.addListener('submit', this.createCar);
  }

  createCar = async (e: Event) => {
    e.preventDefault();
    const data = this.getFormData();
    if (data) {
      await Car.createCar(`${data.name}`, `${data.color}`);
    }
  };
}
