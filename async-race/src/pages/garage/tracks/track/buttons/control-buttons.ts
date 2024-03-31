import './buttons.css';
import BaseElement from '../../../../../utils/components/base-element';
import Car from '../car/car-view';

export default class ControlButtons extends BaseElement {
  car: Car;

  startButton: BaseElement;

  stopButton: BaseElement;

  constructor(car: Car) {
    super({ className: ['control-buttons'] });

    this.car = car;

    this.startButton = new BaseElement({
      tag: 'span',
      className: ['control', 'start-button', 'button'],
      content: 'A',
    });
    this.stopButton = new BaseElement({
      tag: 'span',
      className: ['control', 'disabled', 'stop-button', 'button'],
      content: 'B',
    });

    this.addHandler();

    this.appendChildren(this.startButton, this.stopButton);
  }

  private start = () => {
    this.startButton.addClass('disabled');
    this.stopButton.removeClass('disabled');
    this.car.drive();
  };

  private stop = async () => {
    this.stopButton.addClass('disabled');
    await this.car.stop();
    this.startButton.removeClass('disabled');
  };

  private addHandler() {
    this.startButton.addListener('click', this.start);
    this.stopButton.addListener('click', this.stop);
  }
}
