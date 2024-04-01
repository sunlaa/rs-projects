import BaseElement from '../../../../utils/components/base-element';
import Car from '../../tracks/track/car/car-view';

export default class StopRaceButton extends BaseElement {
  cars: Car[] = [];

  stopButtons: HTMLElement[] = [];

  startButtons: HTMLElement[] = [];

  controller: AbortController;

  constructor() {
    super({ className: ['stop-race', 'button', 'disabled'], content: 'Reset' });

    this.controller = new AbortController();

    this.addListener('click', this.returnAllCars);

    this.addListener('update-controller', (event) => {
      const customEvent = event as CustomEvent;
      const { controller } = customEvent.detail;
      this.updateController(controller);
    });
  }

  private updateController = (controller: AbortController) => {
    this.controller = controller;
  };

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

  private returnAllCars = async () => {
    const pageTurns = document.querySelectorAll('.garage .page-turn');
    pageTurns.forEach((elem) => {
      elem.classList.remove('disabled');
    });

    this.addClass('disabled');
    this.stopButtons.forEach((elem) => elem.classList.add('disabled'));
    this.controller.abort();
    const requests = this.cars.map((car) => car.stop());
    await Promise.all(requests);
    const startRace = this.element.previousElementSibling;
    if (startRace && startRace instanceof HTMLElement) {
      startRace.classList.remove('disabled');
    }
    this.startButtons.forEach((elem) => elem.classList.remove('disabled'));
  };

  static resetButton() {
    const raceStop = document.querySelector('.stop-race');
    if (raceStop) {
      raceStop.dispatchEvent(new CustomEvent('click'));
    }
  }
}
