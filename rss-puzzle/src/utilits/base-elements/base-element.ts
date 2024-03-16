import nonNullable from '../check-functions/non-nulable';

type Params<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'tagName'>
> & {
  tag: keyof HTMLElementTagNameMap;
  content?: string;
  className?: string;
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag = Omit<Params, 'tag'>;

export class BaseElement<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(
    params: Params<T>,
    ...childs: (BaseElement | HTMLElement | null)[]
  ) {
    const element = document.createElement(params.tag) as T;
    if (params.className) element.classList.add(params.className);
    if (params.styles) Object.assign(element.style, params.styles);
    if (params.content) element.textContent = params.content;
    Object.assign(element, params);
    this.element = element;
    if (childs) {
      childs.forEach((child) => {
        if (nonNullable(child)) {
          this.append(child);
        }
      });
    }
  }

  setContent(text: string) {
    this.element.textContent = text;
  }

  addClass(className: string) {
    this.element.classList.add(className);
  }

  removeClass(className: string) {
    this.element.classList.remove(className);
  }

  getElement() {
    return this.element;
  }

  append(child: BaseElement | HTMLElement) {
    if (child instanceof BaseElement) {
      const elem = child.getElement();
      this.element.append(elem);
    } else {
      this.element.append(child);
    }
  }

  appendChildren(...children: (BaseElement | HTMLElement | null)[]): void {
    children.filter(nonNullable).forEach((elem) => {
      this.append(elem);
    });
  }

  getChildren(): Element[] {
    const { children } = this.element;
    return Array.from(children);
  }

  remove() {
    this.element.remove();
  }

  addListener(event: string, callback: (e: Event) => void) {
    this.element.addEventListener(event, callback);
  }

  removeListener(event: string, callback: (e: Event) => void) {
    this.element.removeEventListener(event, callback);
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    Object.assign(this.element.style, styles);
  }
}
