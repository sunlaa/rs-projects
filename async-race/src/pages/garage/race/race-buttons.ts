import BaseElement from '../../../utils/components/base-element';
import Car from '../tracks/track/car/car-view';
import StartRaceButton from './start-race/start-race';
import StopRaceButton from './stop-race/stop-race';

export default class RaceButton extends BaseElement {
  currentCars: Car[] = [];

  constructor() {
    super({ className: ['race-buttons'] });

    const startRace = new StartRaceButton();
    const stopRace = new StopRaceButton();

    this.addListener('update-race-data', (event) => {
      const customEvent = event as CustomEvent;
      startRace.updateData(customEvent.detail.cars);
      stopRace.updateData(customEvent.detail.cars);
    });

    this.appendChildren(startRace, stopRace);
  }
}
