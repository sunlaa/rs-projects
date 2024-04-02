import CarElement from '../../../../../utils/components/car-element';
import { CarData } from '../../../../../utils/types/types';
import CarName from './car-name';
import CarLogic from './car-logic';

const trackMargin = 160;

export default class Car extends CarElement {
  carName: CarName;

  name: string;

  color: string;

  id: number;

  startTime: number;

  duration: number;

  requestId: number;

  controller: AbortController = new AbortController();

  constructor({ name, color, id }: CarData) {
    super(color);
    this.element.id = `${id}`;

    this.name = name;
    this.carName = new CarName(this.name);

    this.color = color;
    this.id = id;

    this.startTime = NaN;
    this.duration = NaN;
    this.requestId = NaN;

    this.addListener('update-color', (event) => {
      const customEvent = event as CustomEvent;
      const { clr } = customEvent.detail;
      this.updateColor(clr);
    });
  }

  static async updateCar(id: number, name: string, color: string) {
    await CarLogic.updateCar(id, name, color);
    Car.updateTracksPage();
  }

  static async createCar(name: string, color: string) {
    await CarLogic.createCar(name, color);
    Car.updateTracksPage();
  }

  private updateColor = (color: string) => {
    this.setColor(color);
  };

  async removeCar() {
    const data = await CarLogic.getWinner(this.id);
    if (data) {
      await CarLogic.deleteWinner(this.id);
    }
    await CarLogic.deleteCar(this.id);
    Car.updateTracksPage();
  }

  getDuration = async () => {
    const data = await CarLogic.startEngine(this.id);
    if (data) {
      this.duration = data.distance / data.velocity;
    }
    return data;
  };

  drive = async () => {
    this.controller = new AbortController();

    await this.getDuration();

    this.startAnimation(this.duration);
    const isDrived = await CarLogic.drive(this.id, this.controller);
    if (!isDrived) {
      this.stopAnimation();
    }
  };

  stop = async () => {
    this.controller.abort();

    this.stopAnimation();
    await CarLogic.stopEngine(this.id);
    this.element.style.left = '40px';
  };

  private moveCar = (timestamp: number) => {
    const distance = window.innerWidth - this.element.offsetWidth - trackMargin;
    if (Number.isNaN(this.startTime)) this.startTime = timestamp;
    const progress = timestamp - this.startTime;
    const percentage = Math.min(progress / this.duration, 1);

    const shift = distance * percentage;
    this.element.style.left = `${shift + 40}px`;

    if (percentage < 1) {
      this.requestId = requestAnimationFrame(this.moveCar);
    }
  };

  startAnimation = (duration: number) => {
    this.duration = duration;
    this.startTime = NaN;
    this.requestId = requestAnimationFrame(this.moveCar);
  };

  stopAnimation = () => {
    cancelAnimationFrame(this.requestId);
  };

  static updateTracksPage() {
    const tracksPage = document.querySelector('.tracks-page');
    if (tracksPage) {
      tracksPage.dispatchEvent(new CustomEvent('change-server-data'));
    }
  }
}
