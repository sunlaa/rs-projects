import Div from '../../../../../utilits/base-elements/div-element/div';
import { LocalStorage } from '../../../../../utilits/servises/local-storage';

export default class ImageSwitch extends Div {
  imgSrc: string;

  pieces: Div[][];

  count: number;

  constructor(imgSrc: string, pieces: Div[][]) {
    super({ className: 'switch' });

    this.addClass('image-switch');

    this.imgSrc = imgSrc;
    this.pieces = pieces;
    this.count = 0;

    this.addListener('click', this.imageToogle);

    if (LocalStorage.get('hints-data')?.image === 'false') {
      this.classList().add('disabled');
      this.removeImage();
    }
  }

  imageToogle = () => {
    if (this.classList().contains('disabled')) {
      this.setImage();
      this.classList().remove('disabled');
    } else {
      this.removeImage();
      this.classList().add('disabled');
    }
    this.updateLocalStorage();
  };

  removeImage() {
    const pieces = this.pieces.reduce((acc, elem, i) => {
      if (i >= this.count) return acc.concat(elem);
      return acc.concat([]);
    }, []);

    pieces.forEach((elem) => {
      if (elem) {
        const piece = elem.getElement();
        const base = piece.querySelector<HTMLElement>('.piece');
        const bulge = piece.querySelector<HTMLElement>('.bulge');
        if (bulge) {
          bulge.style.backgroundImage = '';
        }
        if (base) {
          base.style.backgroundImage = '';
        }
      }
    });
  }

  setImage() {
    const pieces = this.pieces.reduce((acc, elem) => acc.concat(elem), []);
    pieces.forEach((elem) => {
      if (elem) {
        const piece = elem.getElement();
        const base = piece.querySelector<HTMLElement>('.piece');
        const bulge = piece.querySelector<HTMLElement>('.bulge');
        if (bulge) {
          bulge.style.backgroundImage = `url('${this.imgSrc}')`;
        }
        if (base) {
          base.style.backgroundImage = `url('${this.imgSrc}')`;
        }
      }
    });
  }

  showImageOnLine() {
    const line = this.pieces[this.count];

    line.forEach((elem) => {
      if (elem) {
        const piece = elem.getElement();
        const base = piece.querySelector<HTMLElement>('.piece');
        const bulge = piece.querySelector<HTMLElement>('.bulge');
        if (bulge) {
          bulge.style.backgroundImage = `url('${this.imgSrc}')`;
        }
        if (base) {
          base.style.backgroundImage = `url('${this.imgSrc}')`;
        }
      }
    });
  }

  updateCount() {
    this.count += 1;
  }

  private updateLocalStorage() {
    const switchData = LocalStorage.get('hints-data');

    if (!switchData) throw new Error('No data about hints!');

    if (this.classList().contains('disabled')) {
      switchData.image = 'false';
    } else {
      switchData.image = 'true';
    }
    LocalStorage.save('hints-data', switchData);
  }
}
