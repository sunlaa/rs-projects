import Div from '../../../../../../utilits/base-elements/div-element/div';
import { CutElements, Sizes } from '../../../../../../utilits/types/types';

const rows = 10;
const bulgeSize = 20;
const expectedCharSize = 10;

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

  cut(): CutElements {
    const lines: Div[] = [];
    const pieces: Div[][] = Array.from({ length: rows }, () => []);

    for (let y = 0; y < rows; y += 1) {
      const sentense: string[] = this.sentenses[y].split(' ');
      const countPiecesInLine = sentense.length;
      const sentenseCharCount = this.getSentenseCharCount(y);

      let passedWidth = 0;

      const line = this.createLine();
      lines.push(line);

      for (let x = 0; x < countPiecesInLine; x += 1) {
        const pieceTextWidth = sentense[x].length * expectedCharSize;

        const padding = this.getPadding(sentenseCharCount, countPiecesInLine);

        const pieceWidth = pieceTextWidth + padding;
        const pieceHeight = this.blockHeight / rows;

        const wrapper = new Div({
          className: 'wrapper',
          id: `${x}`,
        });

        const piece = this.createPiece(sentense[x], pieceHeight, pieceWidth);
        piece.setStyles({
          backgroundPosition: this.getPositionPiece(passedWidth, y),
        });

        const topValue = pieceHeight / 2 - bulgeSize / 2;
        const bulge = this.createBulge(topValue);
        bulge.setStyles({
          backgroundPosition: this.getPositionBulge(passedWidth, y, topValue),
        });

        passedWidth += pieceWidth;

        Slicer.pieceTogether(
          x,
          countPiecesInLine,
          pieceWidth,
          wrapper,
          piece,
          bulge
        );

        wrapper.append(piece);
        pieces[y][x] = wrapper;
      }
    }
    return { pieces, lines };
  }

  private getSentenseCharCount(index: number): number {
    const sentense = this.sentenses[index].split(' ');
    return sentense.reduce((chars, word) => {
      const count = chars;
      const res = count + word.length;
      return res;
    }, 0);
  }

  private getPadding(
    sentenseCharCount: number,
    countPiecesInLine: number
  ): number {
    return (
      (this.blockWidth - sentenseCharCount * expectedCharSize) /
      countPiecesInLine
    );
  }

  private createLine() {
    return new Div({
      className: 'line',
      styles: { height: `${this.blockHeight / rows}px` },
    });
  }

  private createPiece(word: string, pieceHeight: number, pieceWidth: number) {
    return new Div({
      className: 'piece',
      content: word,
      styles: {
        height: `${pieceHeight}px`,
        width: `${pieceWidth}px`,
        backgroundImage: `url('${this.imgSrc}')`,
        backgroundSize: this.backSize,
      },
    });
  }

  private createBulge(topValue: number) {
    return new Div({
      className: 'bulge',
      styles: {
        width: `${bulgeSize}px`,
        height: `${bulgeSize}px`,
        top: `${topValue}px`,
        left: `-${bulgeSize / 2}px`,
        backgroundImage: `url('${this.imgSrc}')`,
        backgroundSize: this.backSize,
      },
    });
  }

  private getPositionPiece(passedWidth: number, rowNum: number): string {
    return `-${passedWidth}px ${(this.blockHeight / rows) * -rowNum}px`;
  }

  private getPositionBulge(
    passedWidth: number,
    rowNum: number,
    topValue: number
  ) {
    return `-${passedWidth - bulgeSize / 2}px ${(this.blockHeight / rows) * -rowNum - topValue}px`;
  }

  private static pieceTogether(
    piecePlace: number,
    countPiecesInLine: number,
    pieceWidth: number,
    wrapper: Div,
    piece: Div,
    bulge: Div
  ) {
    switch (piecePlace) {
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
  }
}
