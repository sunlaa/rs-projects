import BaseElement from '../../../../utils/components/base-element';
import { WinnerData } from '../../../../utils/types/types';
import WinTable from '../../../winners/table/table';
import CarLogic from '../../tracks/track/car/car-logic';

function roundTime(time: number): number {
  const sec = time / 1000;
  if (Number.isInteger(sec)) {
    return sec;
  }
  return +sec.toFixed(2);
}

export default class WinnerBanner extends BaseElement {
  id: number;

  time: number;

  name: string = '';

  wins: number = 1;

  winerData: WinnerData | null;

  constructor({ id, time }: { id: number; time: number }) {
    super({ className: ['winner-banner'] });

    this.winerData = null;

    this.id = id;

    this.time = roundTime(time);

    document.body.append(this.element);
  }

  show() {
    setTimeout(() => this.setStyles({ opacity: '1' }), 400);
    setTimeout(() => this.setStyles({ opacity: '0' }), 3000);

    setTimeout(() => this.remove(), 4000);
  }

  async addContentAndTabulate() {
    await this.getCarName();
    this.setContent(`${this.name} wins by ${this.time} sec!`);
    await this.tabulate();
    WinTable.updateTable();
  }

  private async getCarName() {
    const carData = await CarLogic.getCar(this.id);
    if (carData?.name) {
      this.name = carData.name;
    }
  }

  private async tabulate() {
    await this.isWasWining();
    if (this.winerData) {
      this.wins = this.winerData.wins + 1;
      this.updateTime(this.winerData.time);
      await this.updateWiner();
    } else {
      await this.createWinner();
    }
  }

  private async createWinner() {
    await CarLogic.createWinner(this.id, this.wins, this.time);
  }

  private async updateWiner() {
    await CarLogic.updateWinner(this.id, this.wins, this.time);
  }

  private updateTime(previousTime: number) {
    if (previousTime * 1000 < this.time) {
      this.time = previousTime;
    }
  }

  private async isWasWining() {
    this.winerData = await CarLogic.getWinner(this.id);
  }
}
