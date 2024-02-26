export function assertNonNullable<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) throw new Error(`${value} is not defined!`);
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
    urlToImage: string | null;
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

export type ApiKeyObj = {
    apiKey: string;
};

export type OptionsObj = {
    sources?: string;
    language?: string;
    country?: string;
    category?: string;
};

export interface GetResponseObj {
    endpoint: 'everything' | 'sources';
    options?: OptionsObj;
}

export type URLOptions = Pick<ApiKeyObj, 'apiKey'> & Pick<OptionsObj, 'sources'>;

export type Callback<T> = {
    (data?: T): void;
};
