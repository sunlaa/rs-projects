import BaseElement from '../utils/components/base-element';
import NavigateButton from './navigate-button/navigate-button';

export default class Navigation extends BaseElement {
  winnerPage: HTMLElement;

  constructor(winnerPage: HTMLElement) {
    super(
      { tag: 'nav', className: ['navigation'] },
      new NavigateButton('To garage', '#garage')
    );

    this.winnerPage = winnerPage;
    const toWinners = new NavigateButton('To winners', '#winners');

    toWinners.addListener('click', this.updateTable);
    this.append(toWinners);
  }

  updateTable = () => {
    this.winnerPage.dispatchEvent(new CustomEvent('update-table'));
  };
}
