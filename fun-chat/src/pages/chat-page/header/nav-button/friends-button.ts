import backdrop from '@/utils/components/backdrop';
import BaseElement from '@/utils/components/base-element';

export default class Friends extends BaseElement {
  constructor() {
    super({ textContent: 'Friends', classes: ['header__friends', 'button'] });
    window.addEventListener('resize', this.showBtn);
    this.addListener('click', Friends.openFriends);
  }

  static openFriends() {
    const frineds = document.querySelector('.user-section');
    if (frineds) {
      frineds.dispatchEvent(new CustomEvent('show-friends'));
      backdrop.show();
    }
  }

  private showBtn = () => {
    if (window.innerWidth <= 500) {
      this.show();
    } else {
      this.hide();
    }
  };

  private show() {
    this.setStyles({ display: 'block' });
  }

  private hide() {
    this.setStyles({ display: 'none' });
  }
}
