import { Observer, Subject, User } from '@/utils/types/types';

class WSoket implements Subject {
  socket: WebSocket = new WebSocket('ws://localhost:8080');

  observers: Observer[] = [];

  users: User[] = [];

  constructor() {
    this.socket.addEventListener('message', this.hearMessages);
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    this.observers.splice(observerIndex, 1);
  }

  notify(): void {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }

  log(login: string, password: string) {
    const request = {
      id: '1',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
    this.getAllUsers();
  }

  getAllUsers() {
    const request = {
      id: '1',
      type: 'USER_ACTIVE',
      payload: null,
    };

    this.socket.send(JSON.stringify(request));
  }

  hearMessages = (event: MessageEvent) => {
    const data: { id: string; type: string; payload: { users: [] } } =
      JSON.parse(event.data);

    switch (data.type) {
      case 'USER_ACTIVE': {
        this.users = data.payload.users;
        // console.log('in websocket', this.users);
        this.notify();
        break;
      }
      default: {
        break;
      }
    }
  };
}

const ws = new WSoket();
export default ws;
