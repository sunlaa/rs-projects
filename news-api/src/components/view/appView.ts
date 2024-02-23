import News from './news/news';
import Sources from './sources/sources';
import { Article, NewsSources, ResponseArticle, ResponseSources } from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseArticle) {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseSources) {
        const values: NewsSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
