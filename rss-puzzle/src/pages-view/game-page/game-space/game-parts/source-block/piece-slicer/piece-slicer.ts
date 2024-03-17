import Div from '../../../../../../utilits/base-elements/div-element/div';
import { CutElements, Sizes } from '../../../../../../utilits/types/types';

const bulgeSize = 20;
const fontSize = 10;

export default class Slicer {
  blockWidth: number;

  blockHeight: number;

  sentenses: string[];

  imgSrc: string;

  backSize: string;

  constructor(
    { blockWidth, blockHeight }: Sizes,
    sentenses: string[],
    imgSrc: string
  ) {
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;
    this.sentenses = sentenses;
    this.imgSrc = imgSrc;

    this.backSize = `${this.blockWidth}px ${this.blockHeight}px`;
  }

  private getSentenseArr(index: number): string[] {
    return this.sentenses[index].split(' ');
  }

  private getSentenseCharCount(index: number): number {
    const sentense = this.getSentenseArr(index);
    return sentense.reduce((chars, word) => {
      const count = chars;
      const res = count + word.length;
      return res;
    }, 0);
  }

  private getPadding(sentenseCharCount: number, countPiecesInLine: number) {
    return (this.blockWidth - sentenseCharCount * fontSize) / countPiecesInLine;
  }

  cut(): CutElements {
    const rows = this.sentenses.length;

    const lines: Div[] = [];
    const pieces: Div[][] = Array.from({ length: rows }, () => []);

    for (let y = 0; y < rows; y += 1) {
      const sentense: string[] = this.getSentenseArr(y);
      const countPiecesInLine = sentense.length;

      const sentenseCharCount = this.getSentenseCharCount(y);

      let passedWidth = 0;

      const line = new Div({
        className: 'line',
        styles: { height: `${this.blockHeight / rows}px` },
      });

      lines.push(line);

      for (let x = 0; x < countPiecesInLine; x += 1) {
        const pieceTextWidth = sentense[x].length * fontSize;

        const padding = this.getPadding(sentenseCharCount, countPiecesInLine);

        const pieceWidth = pieceTextWidth + padding;
        const pieceHeight = this.blockHeight / rows;

        const wrapper = new Div({
          className: 'wrapper',
          id: `${x}`,
        });

        const piece = new Div({
          className: 'piece',
          content: sentense[x],
          styles: {
            height: `${pieceHeight}px`,
            width: `${pieceWidth}px`,
            backgroundColor: '#2a30a5',
            backgroundImage: `url('${this.imgSrc}')`,
            backgroundSize: this.backSize,
            backgroundPosition: `-${passedWidth}px ${(this.blockHeight / rows) * -y}px`,
          },
        });

        const topValue = this.blockHeight / rows / 2 - bulgeSize / 2;

        const bulge = new Div({
          className: 'bulge',
          styles: {
            width: `${bulgeSize}px`,
            height: `${bulgeSize}px`,
            top: `${topValue}px`,
            left: `-${bulgeSize / 2}px`,
            backgroundColor: '#2a30a5',
            backgroundImage: `url('${this.imgSrc}')`,
            backgroundSize: this.backSize,
            backgroundPosition: `-${passedWidth - bulgeSize / 2}px ${(this.blockHeight / rows) * -y - topValue}px`,
          },
        });

        passedWidth += pieceWidth;

        switch (x) {
          case 0: {
            piece.setStyles({
              mask: `radial-gradient(
              circle at ${pieceWidth}px 50%,
              transparent ${bulgeSize / 2}px,
              black ${bulgeSize / 2}px
            )`,
            });
            break;
          }
          case countPiecesInLine - 1: {
            wrapper.append(bulge);
            break;
          }
          default: {
            piece.setStyles({
              mask: `radial-gradient(
              circle at ${pieceWidth}px 50%,
              transparent ${bulgeSize / 2}px,
              black ${bulgeSize / 2}px
            )`,
            });
            wrapper.append(bulge);
          }
        }

        wrapper.append(piece);

        pieces[y][x] = wrapper;
      }
    }
    return { pieces, lines };
  }
}
