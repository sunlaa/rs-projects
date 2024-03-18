import Div from '../../../utilits/base-elements/div-element/div';
import Router from '../../../utilits/servises/router';

export default class ExitButton extends Div {
  router: Router;

  constructor(router: Router) {
    super({ className: 'exit-button' });
    this.router = router;

    this.addListener('click', this.exit);
  }

  exit = () => {
    this.router.navigate('entry-page');
  };
}
