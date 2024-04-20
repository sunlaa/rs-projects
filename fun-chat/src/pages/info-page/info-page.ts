import './info-page.css';
import BaseElement from '@/utils/components/base-element';
import Anchor from '@/utils/components/anchor';
import Title from '@/utils/components/title';
import Brief from '../../utils/components/brief';
import Features from './info-page-parts/features-list';
import ReturnButton from './info-page-parts/return-button';

const intro =
  'This application is a messenger for chatting between multiple people. It works by using the WebSocket protocol. To use the application, you need to install and run the ';

const feature = 'The application has the following functionality:';
const features = [
  'User authorization',
  'Tracking user status (online/offline)',
  'Dynamic updating of the list of users and their status',
  'Sending/receiving messages',
  'Edit/delete messages',
  'Notification of users about any activity of another user',
];

const appAuthor = 'It was developed as part of RSSchool course by ';
const serverAuthor = 'Server developer - ';

export default class InfoPage extends BaseElement {
  constructor(prev: string) {
    super(
      { tag: 'section', classes: ['info-page', 'section'] },
      new Title('Fun Chat', ['info-page__title']),
      new Brief(
        intro,
        undefined,
        new Anchor(
          'server.',
          'https://github.com/rolling-scopes-school/fun-chat-server/tree/main',
          ['info-page__link']
        )
      ),
      new Brief(feature, ['info-pages__features'], new Features(features)),
      new BaseElement(
        { classes: ['info-page__authors'] },
        new Brief(
          appAuthor,
          undefined,
          new Anchor(
            'sunlaa',
            'https://github.com/sunlaa',
            ['info-page__link'],
            new BaseElement({ tag: 'span', classes: ['git-logo'] })
          )
        ),
        new Brief(
          serverAuthor,
          undefined,
          new Anchor(
            'MikAleinik',
            'https://github.com/MikAleinik',
            ['info-page__link'],
            new BaseElement({ tag: 'span', classes: ['git-logo'] })
          )
        )
      ),
      new ReturnButton(prev)
    );
  }
}
