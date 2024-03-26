import './track.css';
import BaseElement from '../../../../utils/components/base-element';
import ControlButtons from './buttons/control-buttons';
import Car from './car/car-view';
import RemoveButton from './buttons/remove-button';
import SelectButton from './buttons/select-button';

export default class Track extends BaseElement {
  constructor(car: Car) {
    super(
      {
        className: ['track'],
      },
      car.carName,
      car,
      new ControlButtons(car),
      new RemoveButton(car),
      new SelectButton(car)
    );
  }
}
