import BaseElement from '../../../../utils/components/base-element';
import CarName from './car-name/car-name';
import Car from './car/car-view';

export default class Track extends BaseElement {
  constructor(car: Car) {
    super({ className: ['track'] }, car, new CarName(car.name));
  }
}
