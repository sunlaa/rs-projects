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

  users: User[];
}

export interface Observer {
  update(subject: Subject): void;
}

export type User = {
  login: string;
  isLogined: boolean;
};
