import './news.css';
import { Article, getElement } from '../../../types/index';

class News {
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

            if (idx % 2) getElement(newsClone, '.news__item').classList.add('alt');

            getElement(newsClone, '.news__meta-photo').style.backgroundImage =
                `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement(newsClone, '.news__description-title').textContent = item.title;
            getElement(newsClone, '.news__description-source').textContent = item.source.name;
            getElement(newsClone, '.news__description-content').textContent = item.description;
            getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        getElement(document, '.news').innerHTML = '';
        getElement(document, '.news').appendChild(fragment);
    }
}
export default News;
