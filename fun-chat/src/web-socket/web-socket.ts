import Observable from '@/utils/services/observable';
import Router from '@/utils/services/router';
import SessionStorage from '@/utils/services/session-storage';
import { Observer, ResponseUserData } from '@/utils/types/types';

export class WSocket extends Observable {
  socket: WebSocket = new WebSocket('ws://localhost:4000');

  observers: Observer[] = [];

  user: string = 'test';

  router: Router | null = null;

  constructor() {
    super();
    this.socket.addEventListener('message', this.hearMessages);
    this.socket.addEventListener('open', () => {
      const data = SessionStorage.get('user-data');
      if (data) {
        this.logIn(data.login, data.password);
      } else if (this.router) {
        this.router.navigate('entry');
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

  sendMessage(to: string, text: string) {
    const request = {
      id: 'send-message',
      type: 'MSG_SEND',
      payload: {
        message: {
          to,
          text,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  fetchMessages(login: string, id: string) {
    const request = {
      id,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  changeReadStatus(id: string) {
    const request = {
      id: 'read-message',
      type: 'MSG_READ',
      payload: {
        message: {
          id,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  editMessage(id: string, text: string) {
    const request = {
      id: 'edit-message',
      type: 'MSG_EDIT',
      payload: {
        message: {
          id,
          text,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  deleteMessage(id: string) {
    const request = {
      id: 'delete-message',
      type: 'MSG_DELETE',
      payload: {
        message: {
          id,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  hearMessages = (event: MessageEvent) => {
    const data: ResponseUserData = JSON.parse(event.data);

    switch (data.type) {
      case 'USER_LOGIN': {
        // Не обновляется имя юзера!
        if (this.router) {
          this.router.navigate('chat');
        }
        this.user = data.payload.user.login;
        this.getAllUsers();
        this.notify();

        break;
      }
      case 'USER_LOGOUT': {
        SessionStorage.clear();
        if (this.router) {
          this.router.navigate('entry');
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
