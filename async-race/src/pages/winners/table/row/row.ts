import BaseElement from '../../../../utils/components/base-element';
import CarElement from '../../../../utils/components/car-element';
import { WinnerData } from '../../../../utils/types/types';
import CarLogic from '../../../garage/tracks/track/car/car-logic';
import Cell from '../ceil/ceil';

export default class Row extends BaseElement<HTMLTableRowElement> {
  constructor(winData: WinnerData, place: number) {
    super({ tag: 'tr' });

    this.fillRow(winData, place);
  }

  private async fillRow({ id, wins, time }: WinnerData, placeNum: number) {
    const carData = await CarLogic.getCar(id);
    if (carData) {
      const place = new Cell(placeNum + 1, 'td');
      const car = new Cell(new CarElement(carData.color), 'td');
      car.addClass('car-cell');
      const name = new Cell(carData.name, 'td');
      const winsCount = new Cell(wins, 'td');
      const bestTime = new Cell(`${time} sec`, 'td');
      this.appendChildren(place, car, name, winsCount, bestTime);
    }
  }
}
