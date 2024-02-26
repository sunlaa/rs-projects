import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertNonNullable, OptionsObj, ResponseArticle, ResponseSources } from '../../types/index';

class App {
    readonly controller: AppController;
    readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(sourceOptions: OptionsObj, newsOptions: OptionsObj): void {
        const sources: Element | null = document.querySelector('.sources');
        assertNonNullable(sources);

        sources.addEventListener('click', (e: Event) =>
            this.controller.getNews(
                e,
                (data: ResponseArticle | undefined) => {
                    assertNonNullable(data);
                    this.view.drawNews(data);
                },
                newsOptions
            )
        );
        this.controller.getSources((data: ResponseSources | undefined) => {
            assertNonNullable(data);
            this.view.drawSources(data);
        }, sourceOptions);
    }
}

export default App;
