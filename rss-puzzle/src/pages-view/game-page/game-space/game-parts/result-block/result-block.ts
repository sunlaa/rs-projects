import './result-block.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';
import { Sizes, ImageData } from '../../../../../utilits/types/types';

export default class ResultBlock extends Div {
  // imgSrc: string;

  // imgTitle: string;

  // imgAuthor: string;
  imageData: ImageData;

  constructor(
    { blockWidth, blockHeight }: Sizes,
    imageData: ImageData,
    ...child: (BaseElement | HTMLElement | null)[]
  ) {
    super(
      {
        className: 'result-block',
        styles: {
          width: `${blockWidth}px`,
          height: `${blockHeight}px`,
        },
      },
      ...child
    );

    this.imageData = imageData;
    this.addListener('end-of-round', this.showImage);
  }

  private showImage = () => {
    this.getElement().innerHTML = '';
    this.setStyles({ backgroundImage: `url('${this.imageData.imgSrc}')` });
    this.append(
      new Div(
        { className: 'pic-brief' },
        new Div({ content: `"${this.imageData.imgTitle}"` }),
        new Div({ content: this.imageData.imgAuthor })
      )
    );
  };
}
