import BaseElement from '../../../utils/components/base-element';
import StopRaceButton from '../race/stop-race/stop-race';
import CarLogic from '../tracks/track/car/car-logic';
import Car from '../tracks/track/car/car-view';
import { getColorArray, getNamesArray } from '../../../utils/functions/random-source';

export default class GenerationButton extends BaseElement {
  requests: Promise<void>[] = [];

  constructor() {
    super({
      className: ['generation-button', 'button'],
      content: 'Generate cars',
    });

    this.addListener('click', this.generation);
  }

  private makeRequests() {
    const colors = getColorArray();
    const names = getNamesArray();
    for (let i = 0; i < 100; i += 1) {
      this.requests.push(CarLogic.createCar(names[i], colors[i]));
    }
  }

  private generation = async () => {
    StopRaceButton.resetButton();

    this.makeRequests();
    await Promise.all(this.requests);

    Car.updateTracksPage();
  };
}
