import Garage from './pages/garage/garage-view';

function render() {
  const garage = new Garage();
  document.body.append(garage.getElement());
}

render();
