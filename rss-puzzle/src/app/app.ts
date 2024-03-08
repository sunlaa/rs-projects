import './global.css';
// import EntryPage from '../pages-view/entry-page/entry-page';
import StartPage from '../pages-view/start-page/start-page';

export default class App {
  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  public run() {
    this.container.append(new StartPage().getElement());
  }
}
