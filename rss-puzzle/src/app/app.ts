import './global.css';
import EntryPage from '../pages-view/entry-page/entry-page';

export default class App {
  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  public run() {
    this.container.append(new EntryPage().getElement());
  }
}
