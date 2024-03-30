import CarElement from '../../../../../utils/components/car-element';
import { CarData } from '../../../../../utils/types/types';
import CarName from './car-name';
import CarLogic from './car-logic';
import WinTable from '../../../../winners/table/table';

export default class Car extends CarElement {
  carName: CarName;

  name: string;

  color: string;

  id: number;

  startTime: number;

  duration: number;

  requestId: number;

  constructor({ name, color, id }: CarData) {
    super(color);

    this.name = name;
    this.carName = new CarName(this.name);

    this.color = color;
    this.id = id;

    this.startTime = NaN;
    this.duration = NaN;
    this.requestId = NaN;
  }

  static async updateCar(id: number, name: string, color: string) {
    await CarLogic.updateCar(id, name, color);
    Car.updateTracksPage();
  }

  static async createCar(name: string, color: string) {
    await CarLogic.createCar(name, color);
    Car.updateTracksPage();
  }

  async removeCar() {
    const data = await CarLogic.getWinner(this.id);
    if (data) {
      await CarLogic.deleteWinner(this.id);
    }
    await CarLogic.deleteCar(this.id);
    Car.updateTracksPage();
    WinTable.updateTable();
  }

  getDuration = async () => {
    const data = await CarLogic.startEngine(this.id);
    if (data) {
      this.duration = data.distance / data.velocity;
    }
    return data;
  };

  drive = async () => {
    await this.getDuration();

    this.startAnimation(this.duration);
    const isDrived = await CarLogic.drive(this.id);
    if (!isDrived) {
      this.stopAnimation();
    }
  };

  stop = async () => {
    await CarLogic.stopEngine(this.id);
    this.stopAnimation();
    this.element.style.left = '40px';
  };

  private moveCar = (timestamp: number) => {
    const distance = window.innerWidth - this.element.offsetWidth - 160; // что за 155
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
