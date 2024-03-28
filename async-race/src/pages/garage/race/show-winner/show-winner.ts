import BaseElement from '../../../../utils/components/base-element';
import { WinnerData } from '../../../../utils/types/types';
import CarLogic from '../../tracks/track/car/car-logic';

export default class WinnerBanner extends BaseElement {
  id: number;

  time: number;

  name: string = '';

  wins: number = 0;

  winerData: WinnerData | null;

  constructor(id: number, time: number) {
    super({ className: ['winner-banner'] });

    this.winerData = null;

    this.id = id;

    this.time = time;

    this.tabulate();
  }

  async getCarName() {
    const carData = await CarLogic.getCar(this.id);
    if (carData?.name) {
      this.name = carData.name;
    }
  }

  updateTime(previousTime: number) {
    if (previousTime < this.time) {
      this.time = previousTime;
    } else {
      this.time = Math.floor(this.time);
    }
  }

  async createWinner() {
    await CarLogic.createWinner(this.id, this.wins, this.time);
  }

  async updateWiner() {
    await CarLogic.updateWinner(this.id, this.wins, this.time);
  }

  async tabulate() {
    await this.isWasWining();
    if (this.winerData) {
      this.wins = this.winerData.wins + 1;
      this.updateTime(this.winerData.time);
      await this.updateWiner();
    } else {
      await this.createWinner();
    }
  }

  async isWasWining() {
    this.winerData = await CarLogic.getWinner(this.id);
  }
}
