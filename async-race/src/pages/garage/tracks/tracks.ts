import './tracks.css';
import View from '../../../utils/components/base-view';
import { CarsData } from '../../../utils/types/types';
import Car from './track/car/car-view';
import Track from './track/track';

export default class Tracks extends View {
  constructor() {
    super({ tag: 'div', className: ['tracks'] });
  }

  updateCars(carsData: CarsData) {
    this.view.getElement().innerHTML = '';
    carsData.forEach((carData) => {
      const track = new Track(new Car(carData));
      this.view.append(track);
    });
  }
}
