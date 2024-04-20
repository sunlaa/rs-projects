import './disconnect.css';
import BaseElement from '@/utils/components/base-element';
import Brief from '@/utils/components/brief';

export default class Disconnect extends BaseElement {
  intervalID: number = 0;

  constructor() {
    super(
      { classes: ['disconnect-banner'] },
      new Brief(
        'Connection failure, please check the connection to the server.',
        ['disconnect-banner__notification', 'section'],
        new BaseElement({ classes: ['loader'] })
      )
    );
  }

  show() {
    document.body.append(this.element);
  }

  hide() {
    this.remove();
  }
}
