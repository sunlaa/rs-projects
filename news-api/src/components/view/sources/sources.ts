import './sources.css';
import { NewsSources, getElement } from '../../../types/index';

class Sources {
    draw(data: NewsSources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp === null) throw Error('Element with id "newsItemTemp" not found');

        data.forEach((item: NewsSources) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw Error('error');
            }

            getElement(sourceClone, '.source__item-name').textContent = item.name;
            getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources').append(fragment);
    }
}

export default Sources;
