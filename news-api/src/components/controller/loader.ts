import { OptionsApiKey, GetRespObj, Callback, noCallback, assertNonNullable, RequestOptions } from '../../types/index';

class Loader {
    private baseLink: string | undefined;
    private options: OptionsApiKey;

    constructor(baseLink: string | undefined, options: OptionsApiKey) {
        this.baseLink = baseLink;
        this.options = options;
        assertNonNullable(this.baseLink);
        assertNonNullable(this.options);
    }

    protected getResp(obj: GetRespObj, callback: Callback = noCallback) {
        assertNonNullable(obj.endpoint);
        if (!obj.options) obj.options = {};
        this.load('GET', obj, callback);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(input: RequestOptions) {
        const urlOptions: { [key: string]: string | null } = { ...this.options, ...input.options };

        let url = `${this.baseLink}${input.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, urlInput: RequestOptions, callback: Callback) {
        assertNonNullable(urlInput);
        fetch(this.makeUrl(urlInput), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
