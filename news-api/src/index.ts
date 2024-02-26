import App from './components/app/app';
import { Filter } from './filter/filter';
import './global.css';

export const app: App = new App();
app.start({}, {});

const filter: Filter = new Filter();
filter.addLanguages();
