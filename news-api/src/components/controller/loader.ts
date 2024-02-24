import { OptionsApiKey, GetRespObj, Callback, noCallback } from '../../types/index';

class Loader {
    private baseLink: string | undefined;
    private options: OptionsApiKey;

    constructor(baseLink: string, options: OptionsApiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(obj: GetRespObj, callback: Callback = noCallback) {
        if (obj.endpoint === undefined) throw new Error('Endpoint not found');
        this.load('GET', obj.endpoint, callback, obj.options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: GetRespObj['options'], endpoint: GetRespObj['endpoint']) {
        const urlOptions: { [key: string]: string | null | undefined } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: GetRespObj['endpoint'], callback: Callback, options: GetRespObj['options']) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
