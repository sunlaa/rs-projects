import BaseElement from '../../../../utils/components/base-element';
import ControlButtons from './buttons/control-buttons';
import CarName from './car-name/car-name';
import Car from './car/car-view';

export default class Track extends BaseElement {
  constructor(car: Car) {
    super(
      {
        className: ['track'],
        styles: { position: 'relative', height: '300px' },
      },
      car,
      new CarName(car.name),
      new ControlButtons(car)
    );
  }
}
