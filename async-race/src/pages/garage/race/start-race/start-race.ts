import BaseElement from '../../../../utils/components/base-element';
import { EngineData } from '../../../../utils/types/types';
import Car from '../../tracks/track/car/car-view';

export default class StartRaceButton extends BaseElement {
  cars: Car[] = [];

  winnerId: number = 0;

  constructor() {
    super({ className: ['start-race', 'button'], content: 'Start race' });
    this.addListener('click', this.startRace);
  }

  updateData(newCars: Car[]) {
    this.cars = newCars;
  }

  makeIdArray() {
    const urls: number[] = [];
    this.cars.forEach((elem) => urls.push(elem.id));
    return urls;
  }

  startRace = async () => {
    await this.startEngines().then((times) => this.driveAll(times));
  };

  driveAll = async (times: number[]) => {
    const urls = this.makeIdArray();
    const requests = urls.map((id, i) =>
      fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
      })
        .then((response) => {
          if (!response.ok) {
            this.cars[i].stopAnimation();
          }
        })
        .then(() => id)
    );

    this.cars.forEach((car, i) => car.startAnimation(times[i]));

    this.winnerId = await Promise.any(requests);
  };

  startEngines = async (): Promise<number[]> => {
    const promises: Promise<EngineData | null>[] = [];

    this.cars.forEach((elem) => promises.push(elem.getDuration()));
    const times = await Promise.all(promises);

    const number: number[] = [];

    times.filter((elem) => elem !== null);
    times.forEach((elem) => {
      if (elem?.distance && elem?.velocity) {
        number.push(elem.distance / elem.velocity);
      }
    });
    return number;
  };
}
