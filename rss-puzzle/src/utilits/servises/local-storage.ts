import nonNullable from '../check-functions/non-nulable';

export type LocalData = {
  [key: string]: string;
};

export class LocalStorage {
  static save(key: string, data: LocalData) {
    const JSONdata = JSON.stringify(data);
    window.localStorage.setItem(key, JSONdata);
  }

  static get(key: string): LocalData | null {
    const data = localStorage.getItem(key);
    if (nonNullable(data)) {
      return JSON.parse(data);
    }

    return null;
  }

  static clear() {
    window.localStorage.clear();
  }
}
