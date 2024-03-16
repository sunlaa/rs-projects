import './result-block.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import { BaseElement } from '../../../../../utilits/base-elements/base-element';
import { Sizes } from '../../../../../utilits/types/types';

export default class ResultBlock extends Div {
  constructor(
    { blockWidth, blockHeight }: Sizes,
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
  }
}
