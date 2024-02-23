export function assertNonNullable<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) throw new Error(`${value} is not defined`);
}

export function getElement<T extends HTMLElement>(container: DocumentFragment | Document, selector: string): T {
    const element = container.querySelector<T>(selector);
    assertNonNullable(element);
    return element;
}

enum Status {
    ok = 'ok',
    error = 'error',
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ResponseArticle {
    status: Status.ok | Status.error;
    totalResult: number;
    articles: Article[];
}

export interface NewsSources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ResponseSources {
    status: Status.ok | Status.error;
    sources: NewsSources[];
}
