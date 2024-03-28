import BaseElement from '../../../../utils/components/base-element';
import Cell from '../ceil/ceil';

export default class HeadRow extends BaseElement<HTMLTableRowElement> {
  wins: Cell = new Cell('Wins', 'th');

  time: Cell = new Cell('Best time', 'th');

  constructor() {
    super({ tag: 'tr' });

    this.fillRow();
  }

  fillRow() {
    const place = new Cell('Place', 'th');
    const car = new Cell('Car', 'th');
    const name = new Cell('Name', 'th');

    this.appendChildren(place, car, name, this.wins, this.time);
  }
}
