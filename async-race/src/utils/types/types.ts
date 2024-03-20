export type Params<T extends HTMLElement = HTMLElement> = Partial<Omit<T, 'tagName'>> & {
  tag: keyof HTMLElementTagNameMap;
  content?: string;
  className?: string[];
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag = Omit<Params, 'tag'>;
