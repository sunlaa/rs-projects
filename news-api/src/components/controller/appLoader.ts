import { assertNonNullable } from '../../types/index';
import Loader from './loader';

assertNonNullable(process.env.API_URL);
assertNonNullable(process.env.API_KEY);
const apiUrlValue: string = process.env.API_URL;
const apiKeyValue: string = process.env.API_KEY;

class AppLoader extends Loader {
    constructor() {
        super(apiUrlValue, {
            apiKey: apiKeyValue,
        });
    }
}

export default AppLoader;
