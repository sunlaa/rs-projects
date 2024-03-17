import './result-button.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import Statistics from '../../game-parts/statistics/statistics';

export default class ResultButton extends Div {
  statistics: Statistics;

  backdrop: Div;

  constructor(statistics: Statistics) {
    super({ className: 'result-button', content: 'Statistics' });
    this.statistics = statistics;

    this.backdrop = new Div({ className: 'backdrop' });

    this.addListener('click', this.showStatistics);
  }

  showStatistics = () => {
    document.body.append(this.backdrop.getElement());
    this.statistics.setStyles({
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    });
  };
}
