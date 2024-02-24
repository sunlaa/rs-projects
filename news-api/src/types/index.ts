export function assertNonNullable<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) throw new Error(`${value} is not defined`);
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

export type OptionsApiKey = {
    apiKey: string | undefined;
};

export type GetRespObj = {
    endpoint: 'everything' | 'sources';
    options?: {
        sources?: string | null;
    };
};

export function noCallback(): void {
    console.error('No callback for GET response');
}

export type Callback = {
    (data?: ResponseArticle | ResponseSources): void;
};
