import './winners.css';
import BaseElement from '../../utils/components/base-element';
import WinTable from './table/table';

export default class Winners extends BaseElement {
  constructor() {
    super({ tag: 'section', className: ['winners'] }, new WinTable());
  }
}
