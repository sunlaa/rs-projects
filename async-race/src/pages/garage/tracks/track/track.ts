import './track.css';
import BaseElement from '../../../../utils/components/base-element';
import ControlButtons from './buttons/control-buttons';
import Car from './car/car-view';
import RemoveButton from './buttons/remove-button';
import SelectButton from './buttons/select-button';

export default class Track extends BaseElement {
  constructor(car: Car) {
    super({
      className: ['track'],
    });

    const redoButtons = new BaseElement(
      { className: ['manipulation'] },
      new RemoveButton(car),
      new SelectButton(car)
    );

    const interactionBlock = new BaseElement(
      { className: ['interaction'] },
      redoButtons,
      car.carName
    );

    const flag = new BaseElement({ className: ['flag'] });

    this.appendChildren(interactionBlock, new ControlButtons(car), car, flag);
  }
}
