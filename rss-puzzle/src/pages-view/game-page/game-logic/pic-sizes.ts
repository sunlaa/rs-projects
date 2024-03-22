import { Sizes } from '../../../utilits/types/types';

export default class PicSizes {
  src: string;

  constructor(src: string) {
    this.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${src}`;
  }

  getSizes() {
    return new Promise<Sizes>((resolve, reject) => {
      const image = new Image();
      image.src = this.src;
      image.onload = () => {
        resolve({ blockWidth: image.width, blockHeight: image.height });
      };
      image.onerror = (err) => {
        reject(err);
      };
    });
  }
}
