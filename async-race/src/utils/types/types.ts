export type Params<T extends HTMLElement = HTMLElement> = Partial<Omit<T, 'tagName' | 'className'>> & {
  tag?: keyof HTMLElementTagNameMap;
  content?: string;
  className?: string[];
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag = Omit<Params, 'tag'>;

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Cars = Car[];
