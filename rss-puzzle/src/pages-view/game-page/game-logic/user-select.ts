import level1 from '../../../sources-data/wordCollectionLevel1.json';
import level2 from '../../../sources-data/wordCollectionLevel2.json';
import level3 from '../../../sources-data/wordCollectionLevel3.json';
import level4 from '../../../sources-data/wordCollectionLevel4.json';
import level5 from '../../../sources-data/wordCollectionLevel5.json';
import level6 from '../../../sources-data/wordCollectionLevel6.json';

export const sources: Sources[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
];

type SentenseData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

type RoundData = {
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

type Sources = {
  rounds: RoundData[];
  roundsCount: number;
};

export default class UserSelect {
  level: number;

  round: number;

  roundData: RoundData;

  sentensesData: SentenseData[];

  constructor(level: number, round: number) {
    this.level = level;
    this.round = round;

    this.roundData = this.getData();
    this.sentensesData = this.roundData.words;
  }

  private getData(): RoundData {
    const level = sources[this.level - 1];
    return level.rounds[this.round - 1];
  }

  getImgSrc(): string {
    return this.roundData.levelData.imageSrc;
  }

  getSentenses(): string[] {
    return this.sentensesData.map((elem) => elem.textExample);
  }

  getTranslate(): string[] {
    return this.sentensesData.map((elem) => elem.textExampleTranslate);
  }

  getAudioSrc(): string[] {
    return this.sentensesData.map((elem) => elem.audioExample);
  }
}
