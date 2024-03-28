import BaseElement from '../../../../utils/components/base-element';
import CarElement from '../../../../utils/components/car-element';
import { WinnerData } from '../../../../utils/types/types';
import CarLogic from '../../../garage/tracks/track/car/car-logic';
import Cell from '../ceil/ceil';

export default class Row extends BaseElement<HTMLTableRowElement> {
  place: number = 0;

  constructor(winData: WinnerData) {
    super({ tag: 'tr' });

    this.fillRow(winData);
  }

  async fillRow({ id, wins, time }: WinnerData) {
    const carData = await CarLogic.getCar(id);
    if (carData) {
      const place = new Cell(this.place + 1, 'td');
      const car = new Cell(new CarElement(carData.color), 'td');
      car.addClass('car-cell');
      const name = new Cell(carData.name, 'td');
      const winsCount = new Cell(wins, 'td');
      const bestTime = new Cell(time, 'td');
      this.appendChildren(place, car, name, winsCount, bestTime);
    }
    this.place = 0;
  }
}
