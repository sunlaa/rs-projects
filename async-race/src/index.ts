import Car from './pages/garage/tracks/track/car/car-view';

const car = new Car({ name: 'Lada', color: '#ff12ee', id: 5 });

document.body.append(car.getElement());
