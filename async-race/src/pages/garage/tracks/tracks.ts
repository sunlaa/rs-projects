import Car from './track/car/car-view';
import Track from './track/track';
import BaseElement from '../../../utils/components/base-element';
import { CarsData } from '../../../utils/types/types';

export default class Tracks extends BaseElement {
  cars: Car[] = [];

  constructor() {
    super({ tag: 'div', className: ['tracks'] });
  }

  renderCars(currentCarsData: CarsData) {
    this.element.innerHTML = '';

    this.cars = [];

    currentCarsData.forEach((carData) => {
      const car = new Car(carData);
      this.cars.push(car);
      const track = new Track(car);
      this.append(track);
    });

    this.updateRaceData();
  }

  protected updateRaceData() {
    const raseButton = document.querySelector('.race-buttons');
    if (raseButton) {
      raseButton.dispatchEvent(
        new CustomEvent('update-race-data', {
          detail: { cars: this.cars },
        })
      );
    }
  }
}
