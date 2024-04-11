import nonNullable from '../functions/non-nullable';

type SessionData = {
  [data: string]: string;
};

export default class SessionStorage {
  static save(key: string, data: SessionData) {
    const JSONdata = JSON.stringify(data);
    window.sessionStorage.setItem(key, JSONdata);
  }

  static get(key: string): SessionData | null {
    const data = sessionStorage.getItem(key);
    if (nonNullable(data)) {
      return JSON.parse(data);
    }

    return null;
  }

  static clear() {
    window.sessionStorage.clear();
  }
}
