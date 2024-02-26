import { ApiKeyObj, GetResponseObj, URLOptions, Callback } from '../../types/index';

export class Loader {
    readonly baseLink: string;
    readonly options: ApiKeyObj;
    constructor(baseLink: string, options: ApiKeyObj) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        obj: GetResponseObj,
        callback: Callback<T> = () => console.error('No callback for GET response')
    ): void {
        if (!obj.options) obj.options = {};
        this.load('GET', obj, callback);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(obj: GetResponseObj): string {
        const urlOptions: URLOptions = { ...this.options, ...obj.options };
        let url: string = `${this.baseLink}${obj.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof URLOptions]}&`;
        });

        console.log(url.slice(0, -1));
        return url.slice(0, -1);
    }

    private load<T>(method: string, obj: GetResponseObj, callback: Callback<T>): void {
        fetch(this.makeUrl(obj), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
