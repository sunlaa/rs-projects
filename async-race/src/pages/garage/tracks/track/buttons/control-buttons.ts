import './buttons.css';
import BaseElement from '../../../../../utils/components/base-element';
import Car from '../car/car-view';

export default class ControlButtons extends BaseElement {
  car: Car;

  startButton: BaseElement;

  stopButton: BaseElement;

  constructor(car: Car) {
    super({ className: ['control-buttons']});

    this.car = car;

    this.startButton = new BaseElement({
      tag: 'span',
      className: ['control', 'start-button'],
      content: 'Start',
    });
    this.stopButton = new BaseElement({
      tag: 'span',
      className: ['control', 'stop-button'],
      content: 'Stop',
    });

    this.addHandler();

    this.appendChildren(this.startButton, this.stopButton);
  }

  start = () => {
    this.startButton.addClass('disabled');
    this.car.drive();
  };

  stop = () => {
    this.car.stop();
    this.startButton.removeClass('disabled');
  };

  addHandler() {
    this.startButton.addListener('click', this.start);
    this.stopButton.addListener('click', this.stop);
  }
}
