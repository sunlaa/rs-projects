import Div from '../../../../../../utilits/base-elements/div-element/div';

function dropOnEmptyPlace(to: HTMLElement, element: HTMLElement) {
  const place = to.querySelector('.placeholder');
  if (place) {
    const nextElem = place.nextElementSibling;
    place.remove();
    to.insertBefore(element, nextElem);
  } else {
    to.append(element);
  }
}

function createEmptyPlace(from: HTMLElement, element: HTMLElement) {
  if (from.lastElementChild === element) {
    return;
  }
  const placeholder = new Div({
    className: 'placeholder',
    styles: {
      width: `${element.offsetWidth}px`,
      backgroundColor: 'transparent',
    },
  });

  from.replaceChild(placeholder.getElement(), element);
}

export default class ListenerHandler {
  currentPieces: Div[];

  currentLine: HTMLDivElement;

  sourceBlock: HTMLDivElement;

  currentDraggble: HTMLElement | null;

  constructor(
    currentPieces: Div[],
    currentLine: Div,
    sourceBlock: HTMLDivElement
  ) {
    this.currentPieces = currentPieces;
    this.currentLine = currentLine.getElement();
    this.sourceBlock = sourceBlock;

    this.currentDraggble = null;
  }

  private checkSourceBlock = () => {
    const picesInSources = [...this.sourceBlock.querySelectorAll('.wrapper')];
    const checkButton = document.querySelector<HTMLElement>('.check-button');
    if (!checkButton) throw new Error('No check-button!');

    if (picesInSources.length === 0) {
      checkButton.classList.remove('disabled');

      checkButton.dispatchEvent(new Event('check'));
    } else {
      checkButton.classList.add('disabled');
    }
  };

  addListeners() {
    this.currentPieces.forEach((piece) => {
      if (piece) {
        piece.addListener('click', this.click);
      }
    });
  }

  removeListeners() {
    this.currentLine.style.pointerEvents = 'none';
  }

  private click = (event: Event) => {
    const clickedPiece = event.currentTarget as HTMLElement;
    const parent = clickedPiece.parentElement;
    if (!parent) throw new Error('No pices parent!');

    if (parent.classList.contains('source-block')) {
      createEmptyPlace(this.sourceBlock, clickedPiece);

      dropOnEmptyPlace(this.currentLine, clickedPiece);
    } else {
      createEmptyPlace(this.currentLine, clickedPiece);

      dropOnEmptyPlace(this.sourceBlock, clickedPiece);
    }

    this.checkSourceBlock();
  };
}
