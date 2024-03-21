import ControlButtons from './pages/garage/tracks/track/buttons/control-buttons';
import Car from './pages/garage/tracks/track/car/car-view';

const car = new Car({ name: 'Ford', color: '#ef3c40', id: 4 });
const buttons = new ControlButtons(car);

document.body.append(buttons.getElement());

document.body.append(car.getElement());
