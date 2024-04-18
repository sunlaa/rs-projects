import Title from '@/utils/components/title';
import './footer.css';
import BaseElement from '@/utils/components/base-element';

export default class FooterChat extends BaseElement {
  constructor() {
    super({ tag: 'footer', classes: ['chat-page-footer', 'footer'] });

    const schoolLogo = new BaseElement<HTMLAnchorElement>(
      {
        tag: 'a',
        href: 'https://rs.school/',
        target: '_blank',
      },
      new BaseElement({ classes: ['footer__school-logo'] })
    );

    const gitLogo = new BaseElement<HTMLAnchorElement>(
      {
        tag: 'a',
        href: 'https://github.com/sunlaa',
        target: '_blank',
        classes: ['footer__git-name'],
      },
      new BaseElement({ classes: ['footer__git-logo'] }),
      new Title('Lada', ['footer__name'])
    );

    const year = new Title('2024', ['footer__year']);

    this.appendChildren(schoolLogo, gitLogo, year);
  }
}
