import { assertNonNullable } from '../types/index';
import { app } from '../index';

export class Filter {
    addLanguages(): void {
        const languages: string[] = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud'];

        const fragment: DocumentFragment = document.createDocumentFragment();
        const langItem: HTMLTemplateElement | null = document.querySelector('#langItemTemplate');

        assertNonNullable(langItem);

        languages.forEach((elem: string) => {
            const langClone: Node = langItem.content.cloneNode(true);

            if (!(langClone instanceof DocumentFragment)) {
                throw new Error('sourceClone is not defined');
            }

            const langBtn: Element | null = langClone.querySelector('.lang__btn');
            assertNonNullable(langBtn);
            langBtn.addEventListener('click', (event: Event) => {
                document.querySelectorAll('.lang__btn').forEach((elem) => elem.classList.remove('active'));

                const btn: EventTarget | null = event.target;
                if (!(btn instanceof Element)) throw new Error('EventTarget not defined');

                btn.classList.add('active');

                const sources: Element | null = document.querySelector('.sources');
                assertNonNullable(sources);
                sources.innerHTML = '';
                app.start({ language: elem }, {});
                console.log('lang: ' + elem);
            });

            const langValue: Element | null = langBtn.querySelector('.lang__btn-name');
            assertNonNullable(langValue);
            langValue.textContent = elem.toUpperCase();

            fragment.append(langClone);
        });

        const filter = document.querySelector('.filter');
        assertNonNullable(filter);
        filter.append(fragment);
    }
}
