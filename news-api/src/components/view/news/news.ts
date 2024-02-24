import './news.css';
import { Article, assertNonNullable } from '../../../types/index';

class News {
    private getElement<T extends HTMLElement>(container: DocumentFragment | Document, selector: string): T {
        const element = container.querySelector<T>(selector);
        assertNonNullable(element);
        return element;
    }
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp === null) throw Error('Element with id "newsItemTemp" not found');

        news.forEach((item: Article, idx: number) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) {
                throw Error('error');
            }

            if (idx % 2) this.getElement(newsClone, '.news__item').classList.add('alt');

            this.getElement(newsClone, '.news__meta-photo').style.backgroundImage =
                `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            this.getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            this.getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            this.getElement(newsClone, '.news__description-title').textContent = item.title;
            this.getElement(newsClone, '.news__description-source').textContent = item.source.name;
            this.getElement(newsClone, '.news__description-content').textContent = item.description;
            this.getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        this.getElement(document, '.news').innerHTML = '';
        this.getElement(document, '.news').appendChild(fragment);
    }
}
export default News;
