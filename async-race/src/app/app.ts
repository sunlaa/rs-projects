import './global.css';
import Garage from '../pages/garage/garage-view';

export default function render() {
  const garage = new Garage();
  document.body.append(garage.getElement());
}
