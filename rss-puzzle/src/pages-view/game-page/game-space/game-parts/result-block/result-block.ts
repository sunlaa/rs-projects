import './result-block.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';
import { Sizes } from '../../../../../utilits/types/types';

export default class ResultBlock extends Div {
  imgSrc: string;

  imgTitle: string;

  imgAuthor: string;

  constructor(
    { blockWidth, blockHeight }: Sizes,
    imgSrc: string,
    imgTitle: string,
    imgAuthor: string,
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
    this.imgSrc = imgSrc;
    this.imgTitle = imgTitle;
    this.imgAuthor = imgAuthor;

    this.addListener('end-of-round', this.showImage);
  }

  showImage = () => {
    this.getElement().innerHTML = '';
    this.setStyles({ backgroundImage: `url('${this.imgSrc}')` });
    this.append(
      new Div(
        { className: 'pic-brief' },
        new Div({ content: `"${this.imgTitle}"` }),
        new Div({ content: this.imgAuthor })
      )
    );
  };
}
