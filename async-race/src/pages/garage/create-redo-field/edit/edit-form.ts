import StopRaceButton from '../../race/stop-race/stop-race';
import Car from '../../tracks/track/car/car-view';
import Form from '../form/form';

export default class EditForm extends Form {
  id: number = 0;

  name: string = '';

  colorName: string = '';

  constructor() {
    super({ className: ['edit-form', 'form'] });
    this.off();

    const enable = this.enable.bind(this);
    this.addListener('edit-car', (event) => {
      const customEvent = event as CustomEvent;
      const { id, name, color } = customEvent.detail;
      enable(id, name, color);
    });
    this.addListener('submit', this.updateCar);
    this.addListener('clear-for-removed', () => {
      this.off();
    });

    this.submit.getElement().value = 'Confirm';
  }

  private enable = (id: number, name: string, color: string) => {
    this.id = id;
    this.name = name;
    this.colorName = color;
    this.on();
    this.color.getElement().value = color;
    this.text.getElement().value = name;
  };

  private updateCar = async (e: Event) => {
    e.preventDefault();
    StopRaceButton.resetButton();

    const data = this.getFormData();
    if (data) {
      if (!this.hasName()) data.name = this.name;
      await Car.updateCar(this.id, `${data.name}`, `${data.color}`);
    }
    this.off();
    this.clearField();
  };
}
