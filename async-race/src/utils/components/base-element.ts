import nonNullable from '../functions/non-nullable';
import { Params } from '../types/types';

export default class BaseElement<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(
    params: Params<T>,
    ...childs: (BaseElement | HTMLElement | null)[]
  ) {
    let { tag } = params;
    if (!tag) tag = 'div';

    const element = document.createElement(tag) as T;

    if (params.className) {
      params.className.forEach((name) => element.classList.add(name));
    }
    if (params.styles) Object.assign(element.style, params.styles);
    if (params.content) element.textContent = params.content;
    Object.assign(element, params);
    this.element = element;
    if (childs) {
      this.appendChildren(...childs);
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

  classList() {
    return this.element.classList;
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

  getChildren(): HTMLElement[] {
    const { children } = this.element;
    const childElements: HTMLElement[] = [];
    for (let i = 0; i < children.length; i += 1) {
      if (children[i] instanceof HTMLElement) {
        childElements.push(children[i] as HTMLElement);
      }
    }
    return childElements;
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
