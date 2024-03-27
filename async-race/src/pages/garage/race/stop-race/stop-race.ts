import BaseElement from '../../../../utils/components/base-element';
import Car from '../../tracks/track/car/car-view';

export default class StopRaceButton extends BaseElement {
  cars: Car[] = [];

  stopButtons: HTMLElement[] = [];

  startButtons: HTMLElement[] = [];

  constructor() {
    super({ className: ['stop-race', 'button', 'disabled'], content: 'Reset' });
    this.addListener('click', this.returnAllCars);
  }

  updateData(newCars: Car[]) {
    this.cars = newCars;
    this.cars.forEach((car) => {
      const contolButtons = car.getElement().previousElementSibling;
      const startButton = contolButtons?.firstElementChild as HTMLElement;
      const stopButton = contolButtons?.lastChild as HTMLElement;
      this.startButtons.push(startButton);
      this.stopButtons.push(stopButton);
    });
  }

  returnAllCars = async () => {
    this.addClass('disabled');
    this.stopButtons.forEach((elem) => elem.classList.add('disabled'));
    const requests = this.cars.map((car) => car.stop());
    await Promise.all(requests);
    const startRace = this.element.previousElementSibling;
    if (startRace && startRace instanceof HTMLElement) {
      startRace.classList.remove('disabled');
    }
    this.startButtons.forEach((elem) => elem.classList.remove('disabled'));
  };
}
