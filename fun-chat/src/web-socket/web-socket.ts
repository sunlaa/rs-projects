import Observable from '@/utils/services/observable';
import Router from '@/utils/services/router';
import SessionStorage from '@/utils/services/session-storage';
import { Observer, User } from '@/utils/types/types';

export class WSocket extends Observable {
  socket: WebSocket = new WebSocket('ws://localhost:4000');

  observers: Observer[] = [];

  user: string = '';

  authenticatedUsers: User[] = [];

  unauthorizedUsers: User[] = [];

  loginErorr: string = '';

  router: Router | null = null;

  constructor() {
    super();
    this.socket.addEventListener('message', this.hearMessages);
    this.socket.addEventListener('open', () => {
      const data = SessionStorage.get('user-data');
      if (data) {
        this.logIn(data.login, data.password);
      }
    });
  }

  logIn(login: string, password: string) {
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

    this.socket.send(JSON.stringify(request));
  }

  logOut() {
    const data = SessionStorage.get('user-data');
    if (!data) throw new Error("No saved user's data");
    const request = {
      id: 'user-logout',
      type: 'USER_LOGOUT',
      payload: {
        user: { ...data },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  private getAllAuthenticatedUsers() {
    const request = {
      id: 'get-authenticated-users',
      type: 'USER_ACTIVE',
      payload: null,
    };

    this.socket.send(JSON.stringify(request));
  }

  private getAllUnauthorizedUsers() {
    const request = {
      id: 'get-unauthorized-users',
      type: 'USER_INACTIVE',
      payload: null,
    };

    this.socket.send(JSON.stringify(request));
  }

  getAllUsers() {
    this.getAllAuthenticatedUsers();
    this.getAllUnauthorizedUsers();
  }

  hearMessages = (event: MessageEvent) => {
    const data: {
      id: string;
      type: string;
      payload: { users: []; error: string; user: User };
    } = JSON.parse(event.data);

    switch (data.type) {
      case 'USER_ACTIVE': {
        this.authenticatedUsers = data.payload.users;
        this.notify();
        break;
      }
      case 'USER_INACTIVE': {
        this.unauthorizedUsers = data.payload.users;
        this.notify();
        break;
      }
      case 'USER_LOGIN': {
        if (this.router) {
          this.router.navigate('chat');
        }
        this.user = data.payload.user.login;
        this.getAllUsers();
        break;
      }
      case 'USER_LOGOUT': {
        if (this.router) {
          this.router.navigate('entry');
        }
        SessionStorage.clear();
        break;
      }
      case 'ERROR': {
        if (data.id === 'user-login') {
          sessionStorage.clear();
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
