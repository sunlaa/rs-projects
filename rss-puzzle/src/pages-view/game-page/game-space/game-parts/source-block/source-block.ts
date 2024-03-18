import './source-block.css';
import Div from '../../../../../utilits/base-elements/div-element/div';
import ListenerHandler from './listener-handler/listener-handler';

export default class SourceBlock extends Div {
  pieces: Div[][];

  lines: Div[];

  currentPieces: Div[];

  currentLine: Div;

  counter: number;

  listenerHandler: ListenerHandler;

  constructor(
    pieces: Div[][],
    lines: Div[],
    blockWidth: number,
    blockHeight: number
  ) {
    super({
      className: 'source-block',
      styles: {
        width: `${blockWidth}px`,
        height: `${blockHeight / 5}px`,
      },
    });

    this.pieces = pieces;
    this.lines = lines;

    this.counter = 0;

    this.currentPieces = pieces[this.counter];
    this.currentLine = lines[this.counter];

    this.listenerHandler = new ListenerHandler(
      this.currentPieces,
      this.currentLine,
      this.element
    );

    this.addPieces();
  }

  updateCurrentElements() {
    this.currentPieces = this.pieces[this.counter];
    this.currentLine = this.lines[this.counter];
  }

  random = () => {
    for (let i = this.currentPieces.length; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentPieces[i], this.currentPieces[j]] = [
        this.currentPieces[j],
        this.currentPieces[i],
      ];
    }
    return this.currentPieces;
  };

  addPieces = () => {
    const randomPieces = this.random();

    this.addEvents();

    this.element.innerHTML = '';
    this.appendChildren(...randomPieces);

    this.counter += 1;
    this.updateCurrentElements();
  };

  updatePieces = () => {
    this.removeEvents();

    this.addPieces();
  };

  addEvents() {
    this.listenerHandler = new ListenerHandler(
      this.currentPieces,
      this.currentLine,
      this.element
    );
    this.listenerHandler.addListeners();
  }

  removeEvents() {
    this.listenerHandler.removeListeners();
  }
}
