import BaseElement from '../../../../utils/components/base-element';
import { EngineData } from '../../../../utils/types/types';
import Car from '../../tracks/track/car/car-view';
import WinnerBanner from '../show-winner/show-winner';

export default class StartRaceButton extends BaseElement {
  cars: Car[] = [];

  stopButtons: HTMLElement[] = [];

  startButtons: HTMLElement[] = [];

  winnerData: { id: number; time: number } = { id: 0, time: 0 };

  constructor() {
    super({ className: ['start-race', 'button'], content: 'Go!' });
    this.addListener('click', this.startRace);
  }

  updateData(newCars: Car[]) {
    this.cars = newCars;
    this.cars.forEach((car) => {
      const contolButtons = car.getElement().previousElementSibling;
      const startButton = contolButtons?.firstElementChild as HTMLElement;
      const stopButton = contolButtons?.lastChild as HTMLElement;
      this.startButtons.push(startButton);
      this.stopButtons.push(stopButton);
    });
  }

  startRace = async () => {
    const stopRace = this.element.nextElementSibling;
    if (stopRace && stopRace instanceof HTMLElement) {
      stopRace.classList.remove('disabled');
    }
    this.stopButtons.forEach((elem) => elem.classList.remove('disabled'));
    this.addClass('disabled');
    this.startButtons.forEach((elem) => elem.classList.add('disabled'));
    await this.startEngines().then((times) => this.driveAll(times));
  };

  makeIdArray() {
    const urls: number[] = [];
    this.cars.forEach((elem) => urls.push(elem.id));
    return urls;
  }

  driveAll = async (times: number[]) => {
    const urls = this.makeIdArray();
    const requests = urls.map(
      (id, i) =>
        new Promise<{ id: number; time: number }>((resolve, reject) => {
          fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
            method: 'PATCH',
          })
            .then((response) => {
              if (!response.ok) {
                this.cars[i].stopAnimation();
                throw new Error('The End!');
              }
              return { id, time: times[i] };
            })
            .then((winnerData) => {
              resolve(winnerData);
            })
            .catch((err) => {
              reject(err);
            });
        })
    );

    this.cars.forEach((car, i) => car.startAnimation(times[i]));
    this.winnerData = await Promise.any(requests);

    this.showWinner();
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

  showWinner() {
    const banner = new WinnerBanner(this.winnerData);
    banner.show();
  }
}
