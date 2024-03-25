import './track.css';
import BaseElement from '../../../../utils/components/base-element';
import ControlButtons from './buttons/control-buttons';
import CarName from './car-name/car-name';
import Car from './car/car-view';
import RemoveButton from './buttons/remove-button';

export default class Track extends BaseElement {
  constructor(car: Car) {
    super(
      {
        className: ['track'],
      },
      new CarName(car.name),
      car,
      new ControlButtons(car),
      new RemoveButton(car)
    );
  }
}
