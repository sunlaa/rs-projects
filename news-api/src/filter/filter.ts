import { assertNonNullable } from '../types/index';
import { app } from '../index';
import './filter.css';

export class Filter {
    languages: string[];
    body: HTMLElement;
    filter: HTMLElement;
    langMenuBtn: HTMLElement;
    langMenu: HTMLElement;
    backdrop: HTMLElement;
    constructor() {
        this.languages = [
            '🇦🇷 ar',
            '🇩🇪 de',
            '🇺🇸 en',
            '🇪🇸 es',
            '🇫🇷 fr',
            '🇮🇱 he',
            '🇮🇹 it',
            '🇳🇱 nl',
            '🇳🇴 no',
            '🇵🇹 pt',
            '🇷🇺 ru',
            '🇸🇪 sv',
        ];
        this.filter = this.getElement(document, '.filter');
        this.langMenuBtn = this.getElement(document, '.choose-lang');
        this.langMenu = this.getElement(document, '.filter-menu');
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('backdrop');
        this.body = this.getElement(document, 'body');
    }
    private getElement<T extends HTMLElement>(container: DocumentFragment | Document, selector: string): T {
        const element: T | null = container.querySelector<T>(selector);
        assertNonNullable(element);
        return element;
    }

    addLanguages(): DocumentFragment {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const langItem: HTMLTemplateElement | null = document.querySelector('#langItemTemplate');

        assertNonNullable(langItem);

        this.languages.forEach((elem: string) => {
            const langClone: Node = langItem.content.cloneNode(true);

            if (!(langClone instanceof DocumentFragment)) {
                throw new Error('sourceClone is not defined');
            }

            const langBtn: Element | null = this.getElement(langClone, '.lang__btn');

            langBtn.addEventListener('click', (event: Event) => {
                document.querySelectorAll('.lang__btn').forEach((elem) => elem.classList.remove('active'));

                const btn: EventTarget | null = event.target;
                if (!(btn instanceof Element)) throw new Error('EventTarget not defined');

                btn.classList.add('active');

                this.langMenu.style.transform = 'translateY(-110lvh)';
                this.backdrop.style.display = 'none';

                this.getElement(document, '.sources').innerHTML = '';
                app.start({ language: elem.slice(-2) }, {});
            });

            const langValue: Element | null = langBtn.querySelector('.lang__btn-name');
            assertNonNullable(langValue);
            langValue.textContent = elem.toUpperCase();

            fragment.append(langClone);
        });

        this.langMenuBtn.addEventListener('click', () => {
            this.langMenu.style.transform = 'translateY(0)';
            this.backdrop.style.display = 'block';
            this.body.append(this.backdrop);
        });
        return fragment;
    }

    fillFilter(): void {
        const fragment = this.addLanguages();
        this.filter.append(fragment);
    }

    fillTopMenu(): void {
        const fragment = this.addLanguages();
        this.langMenu.append(fragment);
    }
}
