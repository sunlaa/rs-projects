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
