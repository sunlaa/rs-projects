import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertNonNullable, ResponseArticle, ResponseSources } from '../../types/index';

class App {
    readonly controller: AppController;
    readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources: Element | null = document.querySelector('.sources');
        assertNonNullable(sources);

        sources.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: ResponseArticle | undefined) => {
                assertNonNullable(data);
                this.view.drawNews(data);
            })
        );
        this.controller.getSources((data: ResponseSources | undefined) => {
            assertNonNullable(data);
            this.view.drawSources(data);
        });
    }
}

export default App;
