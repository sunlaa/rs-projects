import Observable from '@/utils/services/observable';
import Router from '@/utils/services/router';
import { Observer, User } from '@/utils/types/types';

export class WSocket extends Observable {
  socket: WebSocket = new WebSocket('ws://localhost:4000');

  observers: Observer[] = [];

  users: User[] = [];

  loginErorr: string = '';

  router: Router | null = null;

  constructor() {
    super();
    this.socket.addEventListener('message', this.hearMessages);
  }

  log(login: string, password: string, router: Router) {
    const request = {
      id: 'user-login',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.router = router;
    this.socket.send(JSON.stringify(request));
  }

  getAllAuthenticatedUsers() {
    const request = {
      id: 'get-authenticated-users',
      type: 'USER_ACTIVE',
      payload: null,
    };

    this.socket.send(JSON.stringify(request));
  }

  hearMessages = (event: MessageEvent) => {
    const data: {
      id: string;
      type: string;
      payload: { users: []; error: string };
    } = JSON.parse(event.data);

    switch (data.type) {
      case 'USER_ACTIVE': {
        this.users = data.payload.users;
        this.notify();
        break;
      }
      case 'USER_LOGIN': {
        if (this.router) {
          this.router.navigate('chat');
        }
        this.getAllAuthenticatedUsers();
        break;
      }
      case 'ERROR': {
        if (data.id === 'user-login') {
          const errorMessage = data.payload.error;
          this.loginErorr = `${errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}.`;
          this.notify();
        }
        break;
      }
      default: {
        break;
      }
    }
  };
}

const ws = new WSocket();
export default ws;
