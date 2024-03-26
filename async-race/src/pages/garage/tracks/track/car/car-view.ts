import BaseElement from '../../../../../utils/components/base-element';
import { CarData } from '../../../../../utils/types/types';
import CarName from '../car-name/car-name';
import CarLogic from './car-logic';

export default class Car extends BaseElement {
  carName: CarName;

  name: string;

  color: string;

  id: number;

  startTime: number;

  duration: number;

  requestId: number;

  constructor({ name, color, id }: CarData) {
    super({ className: ['car'] });
    this.element.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="170" height="45" viewBox="0 0 230 80" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(0 -70) scale(2.5 2.5)" >
      <path d="M 85.347 42.526 l -23.367 -4.73 l -8.231 -4.776 c -3.501 -2.031 -7.491 -3.105 -11.538 -3.105 h -4.915 c -0.002 0 -0.004 0 -0.006 0 h -5.612 c -4.288 0 -8.558 1.058 -12.35 3.06 l -6.167 3.255 c -1.226 0.647 -2.607 0.99 -3.993 0.99 H 6.703 c -2.427 0 -4.529 1.729 -4.998 4.11 l -1.642 8.345 c -0.342 1.738 0.735 3.44 2.451 3.875 l 8.903 2.259 c -0.423 -1.054 -0.662 -2.202 -0.662 -3.405 c 0 -5.064 4.12 -9.185 9.184 -9.185 s 9.184 4.12 9.184 9.185 c 0 1.473 -0.357 2.861 -0.976 4.096 h 37.26 c -0.619 -1.235 -0.976 -2.623 -0.976 -4.096 c 0 -5.064 4.12 -9.185 9.185 -9.185 c 5.063 0 9.184 4.12 9.184 9.185 c 0 1.359 -0.305 2.646 -0.837 3.808 l 4.523 -0.491 C 88.488 55.502 90 53.817 90 51.801 v -3.584 C 90 45.465 88.043 43.072 85.347 42.526 z M 25.017 39.643 c -2.192 0 -4.313 -0.647 -6.132 -1.872 l -0.975 -0.656 l 2.819 -1.488 c 3.361 -1.775 7.148 -2.713 10.949 -2.713 h 4.432 l 1.485 6.729 H 25.017 z M 53.366 39.643 h -12.7 l -1.485 -6.729 h 3.029 c 3.519 0 6.988 0.934 10.032 2.7 l 5.752 3.337 C 56.496 39.405 54.948 39.643 53.366 39.643 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 73.615 60.086 c -4.237 0 -7.685 -3.447 -7.685 -7.684 c 0 -4.237 3.447 -7.685 7.685 -7.685 c 4.236 0 7.684 3.447 7.684 7.685 C 81.299 56.639 77.852 60.086 73.615 60.086 z M 73.615 47.718 c -2.583 0 -4.685 2.102 -4.685 4.685 s 2.102 4.684 4.685 4.684 s 4.684 -2.101 4.684 -4.684 S 76.198 47.718 73.615 47.718 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 19.939 60.086 c -4.237 0 -7.684 -3.447 -7.684 -7.684 c 0 -4.237 3.447 -7.685 7.684 -7.685 s 7.684 3.447 7.684 7.685 C 27.623 56.639 24.176 60.086 19.939 60.086 z M 19.939 47.718 c -2.583 0 -4.684 2.102 -4.684 4.685 s 2.101 4.684 4.684 4.684 c 2.583 0 4.684 -2.101 4.684 -4.684 S 22.521 47.718 19.939 47.718 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 73.609 54.899 c -0.649 0 -1.3 -0.26 -1.76 -0.729 c -0.12 -0.11 -0.22 -0.24 -0.31 -0.38 c -0.09 -0.141 -0.17 -0.28 -0.23 -0.431 c -0.069 -0.149 -0.109 -0.31 -0.149 -0.47 c -0.03 -0.16 -0.04 -0.33 -0.04 -0.49 c 0 -0.659 0.26 -1.3 0.729 -1.76 c 0.58 -0.59 1.44 -0.859 2.25 -0.689 c 0.16 0.029 0.32 0.08 0.47 0.14 c 0.15 0.07 0.301 0.14 0.431 0.229 c 0.14 0.091 0.27 0.2 0.38 0.32 c 0.47 0.46 0.729 1.101 0.729 1.76 c 0 0.16 -0.01 0.33 -0.05 0.49 c -0.029 0.16 -0.08 0.32 -0.14 0.47 c -0.061 0.15 -0.14 0.29 -0.23 0.431 c -0.09 0.14 -0.189 0.27 -0.31 0.38 C 74.92 54.64 74.27 54.899 73.609 54.899 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 19.94 54.899 c -0.66 0 -1.31 -0.27 -1.77 -0.729 s -0.73 -1.11 -0.73 -1.771 c 0 -0.659 0.27 -1.3 0.73 -1.77 c 0.93 -0.93 2.61 -0.93 3.54 0 c 0.46 0.47 0.73 1.11 0.73 1.77 c 0 0.66 -0.27 1.301 -0.73 1.771 C 21.24 54.63 20.6 54.899 19.94 54.899 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
    </svg>`;

    this.name = name;
    this.carName = new CarName(this.name);

    this.color = color;
    this.id = id;

    this.startTime = NaN;
    this.duration = NaN;
    this.requestId = NaN;

    this.setColor(this.color);
  }

  setColor(color: string) {
    const carBody = this.element.firstElementChild?.firstElementChild
      ?.firstElementChild as HTMLElement;
    if (carBody) {
      carBody.style.fill = color;
    }
  }

  changeColor(color: string) {
    this.setColor(color);
    this.color = color;
    CarLogic.updateCar(this.id, this.name, color);
  }

  changeName(name: string) {
    this.name = name;
    this.carName.updateName(this.name);
    CarLogic.updateCar(this.id, name, this.color);
  }

  static async createCar(name: string, color: string) {
    await CarLogic.createCar(name, color);
    Car.updateTracksPage();
  }

  removeCar() {
    CarLogic.deleteCar(this.id);
    Car.updateTracksPage();
  }

  drive = async () => {
    const data = await CarLogic.startEngine(this.id);
    if (data) {
      this.duration = data.distance / data.velocity;
    }

    this.startAnimation(this.duration);
    const isDrived = await CarLogic.drive(this.id);
    if (!isDrived) {
      this.stopAnimation();
    }
  };

  stop = async () => {
    await CarLogic.stopEngine(this.id);
    this.stopAnimation();
    this.element.style.left = '5rem';
  };

  private moveCar = (timestamp: number) => {
    const distance = window.innerWidth - this.element.offsetWidth - 130;
    if (Number.isNaN(this.startTime)) this.startTime = timestamp;
    const progress = timestamp - this.startTime;
    const percentage = Math.min(progress / this.duration, 1);

    const shift = distance * percentage;
    this.element.style.left = `${shift + 80}px`;

    if (percentage < 1) {
      this.requestId = requestAnimationFrame(this.moveCar);
    }
  };

  private startAnimation = (duration: number) => {
    this.duration = duration;
    this.startTime = NaN;
    this.requestId = requestAnimationFrame(this.moveCar);
  };

  private stopAnimation = () => {
    cancelAnimationFrame(this.requestId);
  };

  static updateTracksPage() {
    const pageCounter = document.querySelector('.page-counter');
    if (pageCounter) {
      const page = pageCounter.textContent ? +pageCounter.textContent[6] : 0;

      const tracksPage = document.querySelector('.tracks-page');
      if (tracksPage) {
        tracksPage.dispatchEvent(
          new CustomEvent('change-server-data', {
            bubbles: true,
            detail: { pageNum: page - 1 },
          })
        );
      }
    }
  }
}
