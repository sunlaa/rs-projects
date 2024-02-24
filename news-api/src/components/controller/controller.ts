import AppLoader from './appLoader';
import { assertNonNullable, Callback } from '../../types/index';

class AppController extends AppLoader {
    public getSources(callback: Callback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    private assertInstance<T extends Element>(value: EventTarget): asserts value is T {
        if (!(value instanceof Element)) throw new Error(`${value} is no defined!`);
    }

    public getNews(e: Event, callback: Callback) {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        assertNonNullable(newsContainer);
        this.assertInstance(newsContainer);

        while (target !== newsContainer) {
            assertNonNullable(target);
            this.assertInstance(target);
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                assertNonNullable(sourceId);
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
