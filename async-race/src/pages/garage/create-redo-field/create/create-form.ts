import StopRaceButton from '../../race/stop-race/stop-race';
import Car from '../../tracks/track/car/car-view';
import Form from '../form/form';

export default class CreateForm extends Form {
  constructor() {
    super({ className: ['create-form', 'form'] });
    this.addListener('submit', this.createCar);
    this.append(this.hint);
    this.submit.getElement().value = 'Create';
  }

  createCar = async (e: Event) => {
    e.preventDefault();
    const data = this.getFormData();
    if (data) {
      if (!this.hasName()) {
        this.showHint();
        return;
      }

      StopRaceButton.resetButton();
      await Car.createCar(`${data.name}`, `${data.color}`);
    }
    this.text.getElement().value = '';
  };

  showHint() {
    this.hint.setStyles({ opacity: '1' });
    setTimeout(() => this.hint.setStyles({ opacity: '0' }), 3000);
  }
}
