import './info-page.css';
import BaseElement from '@/utils/components/base-element';
import Anchor from '@/utils/components/anchor';
import Title from '@/utils/components/title';
import Brief from './info-page-parts/brief';
import Features from './info-page-parts/features-list';

const intro =
  'The application is a messenger for communication between several people working via WebSocket. The application requires installation and running the server locally.';

const feature = 'The application has the following functionality:';
const features = [
  'User registration',
  'Tracking user status (online/offline)',
  'Dynamic updating of the list of users and their status',
  'Sending/receiving messages',
  'Edit/delete messages',
  'Notification of users about any activity of another user',
];

const appAuthor =
  'The application was developed as part of RSSchool course by ';
const serverAuthor = 'Server developer - ';

export default class InfoPage extends BaseElement {
  constructor() {
    super(
      { tag: 'section', classes: ['info-page', 'section'] },
      new Title('Fun Chat', ['info-page__title']),
      new Brief(intro),
      new Brief(feature, ['info-pages__features'], new Features(features)),
      new BaseElement(
        { classes: ['info-page__authors'] },
        new Brief(
          appAuthor,
          undefined,
          new Anchor('sunlaa', 'https://github.com/sunlaa', ['info-page__link'])
        ),
        new Brief(
          serverAuthor,
          undefined,
          new Anchor('MikAleinik', 'https://github.com/MikAleinik', [
            'info-page__link',
          ])
        )
      )
    );
  }
}
