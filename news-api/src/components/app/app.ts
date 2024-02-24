import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertNonNullable } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: Element | null = document.querySelector('.sources');
        assertNonNullable(sources);

        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => {
                assertNonNullable(data);
                this.view.drawNews(data);
            })
        );
        this.controller.getSources((data) => {
            assertNonNullable(data);
            this.view.drawSources(data);
        });
    }
}

export default App;
