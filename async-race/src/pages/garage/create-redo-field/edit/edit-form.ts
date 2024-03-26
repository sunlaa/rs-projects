import Car from '../../tracks/track/car/car-view';
import Form from '../form/form';

export default class EditForm extends Form {
  id: number = 0;

  constructor() {
    super({ className: ['edit-form', 'form'] });
    this.off();

    const enable = this.enable.bind(this);
    this.addListener('edit-car', (event) => {
      const customEvent = event as CustomEvent;
      const { id } = customEvent.detail;
      enable(id);
    });
    this.addListener('submit', this.updateCar);
  }

  enable = (id: number) => {
    this.id = id;
    this.on();
  };

  updateCar = async (e: Event) => {
    e.preventDefault();
    const data = this.getFormData();
    if (data) {
      await Car.updateCar(this.id, `${data.name}`, `${data.color}`);
    }
    this.off();
    this.clearField();
  };
}
