import BaseElement from '@/utils/components/base-element';

export default class Features extends BaseElement<HTMLUListElement> {
  features: string[];

  constructor(features: string[]) {
    super({ tag: 'ul', classes: ['info-pages__list', 'info-list'] });

    this.features = features;
    this.fillList();
  }

  fillList() {
    const li = (textContent: string) =>
      new BaseElement({ tag: 'li', textContent, classes: ['info-list__item'] });

    this.features.forEach((feature) => {
      this.append(li(feature));
    });
  }
}
