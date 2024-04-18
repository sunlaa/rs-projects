import InfoPage from '@/pages/info-page/info-page';
import BaseElement from '@/utils/components/base-element';
import Router from '@/utils/services/router';

export default class InfoButton extends BaseElement {
  prev: 'entry' | 'chat';

  router: Router;

  constructor(router: Router, prev: 'entry' | 'chat') {
    super({ textContent: 'Info', classes: ['header__info', 'button'] });

    this.router = router;
    this.prev = prev;

    this.addListener('click', this.navigate);
  }

  navigate = () => {
    this.router.navigate('info');
    const info = new InfoPage(this.prev);
    document.body.append(info.element);
  };
}
