export type Params<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'tagName' | 'className'>
> & {
  tag?: keyof HTMLElementTagNameMap;
  content?: string;
  className?: string[];
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag = Omit<Params, 'tag'>;

export type CarData = {
  name: string;
  color: string;
  id: number;
};

export type CarsData = CarData[];

export type EngineData = {
  velocity: number;
  distance: number;
};

export type ForRedo = { name?: string; color?: string };

export type CarsOnPageData = { start: number; end: number };

export type Route = {
  path: string;
  callback: () => void;
};
