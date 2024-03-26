import BaseElement from '../../../../utils/components/base-element';
import { EngineData } from '../../../../utils/types/types';
// import { EngineData } from '../../../../utils/types/types';
import Car from '../../tracks/track/car/car-view';

export default class StartRaceButton extends BaseElement {
  cars: Car[] = [];

  constructor() {
    super({ className: ['start-race', 'button'], content: 'Start race' });
    this.addListener('click', this.startCars);
  }

  updateData(newCars: Car[]) {
    this.cars = newCars;
  }

  makeIdArray() {
    const urls: number[] = [];
    this.cars.forEach((elem) => urls.push(elem.id));
    return urls;
  }

  // async getTime() {
  //   const urls = this.makeIdArray();
  //   const requests = urls.map((id) =>
  //     fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
  //       method: 'PATCH',
  //     })
  //   );
  //   const times: number[] = [];

  //   const responses = await Promise.all(requests);
  //   const promises: Promise<EngineData>[] = responses.map((elem) =>
  //     elem.json()
  //   );

  //   await Promise.all(promises).then((engineData: EngineData[]) =>
  //     engineData.forEach((data) => times.push(data.distance / data.velocity))
  //   );

  //   return times;
  // }

  // async startAllCars() {

  // }

  startCars = async () => {
    const promises: Promise<EngineData | null>[] = [];
    this.cars.forEach((elem) => promises.push(elem.getDuration()));
    await Promise.all(promises).then((elem) => elem.forEach((el) => el));
  };
}
