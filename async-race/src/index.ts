import Garage from './pages/garage/garage-view';
import CarLogic from './pages/garage/tracks/track/car/car-logic';

async function render() {
  const data = await CarLogic.getAllCars();
  if (data) {
    const garage = new Garage(data);
    document.body.append(garage.view.getElement());
  }
}

render();
