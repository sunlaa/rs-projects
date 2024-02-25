import './sources.css';
import { NewsSources, assertNonNullable } from '../../../types/index';

class Sources {
    private getElement<T extends HTMLElement>(container: DocumentFragment | Document, selector: string): T {
        const element: T | null = container.querySelector<T>(selector);
        assertNonNullable(element);
        return element;
    }

    public draw(data: NewsSources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        assertNonNullable(sourceItemTemp);

        data.forEach((item: NewsSources) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('sourceClone is not defined');
            }

            this.getElement(sourceClone, '.source__item-name').textContent = item.name;
            this.getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        this.getElement(document, '.sources').append(fragment);
    }
}

export default Sources;
