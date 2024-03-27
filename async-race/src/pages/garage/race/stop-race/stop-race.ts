import BaseElement from '../../../../utils/components/base-element';
import Car from '../../tracks/track/car/car-view';

export default class StopRaceButton extends BaseElement {
  cars: Car[] = [];

  constructor() {
    super({ className: ['stop-race', 'button'], content: 'Stop race' });
    this.addListener('click', this.returnAllCars);
  }

  updateData(newCars: Car[]) {
    this.cars = newCars;
  }

  returnAllCars = async () => {
    const requests = this.cars.map((car) => car.stop());
    await Promise.all(requests);
  };
}
