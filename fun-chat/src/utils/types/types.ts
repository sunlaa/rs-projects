export type Params<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'tagName' | 'className'>
> & {
  tag?: keyof HTMLElementTagNameMap;
  content?: string;
  className?: string[];
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag<T extends HTMLElement = HTMLElement> = Omit<
  Params<T>,
  'tag'
>;

export type Route = {
  path: string;
  callback: () => void;
};

export interface Subject {
  attach(observer: Observer): void;

  detach(observer: Observer): void;

  notify(): void;
}

export interface Observer {
  update(subject: Subject): void;
}

export type WSData = {
  id: string | null;
  type: string;
  payload: object;
};

export type AuthenticationData = {
  user: {
    login: string;
    password: string;
  };
};

export const loginRegExp = /^[A-Z]/;

export const passwordRegExp = /.*[A-Z].*/;

export type User = {
  login: string;
  isLogined: boolean;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};
