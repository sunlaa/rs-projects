import Div from '../base-elements/div-element/div';

export type Sizes = {
  blockWidth: number;
  blockHeight: number;
};

export type CutElements = {
  lines: Div[];
  pieces: Div[][];
};

export type SentenseData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type RoundData = {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: SentenseData[];
};

export type Sources = {
  rounds: RoundData[];
  roundsCount: number;
};

export type ChoosenSentensesData = {
  sentenses: string[];
  translate: string[];
  audioSrc: string[];
};

export type ImageData = {
  imgSrc: string;
  imgTitle: string;
  imgAuthor: string;
};
