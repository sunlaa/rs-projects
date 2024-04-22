export type Params<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'tagName' | 'className'>
> & {
  tag?: keyof HTMLElementTagNameMap;
  content?: string;
  classes?: string[];
  styles?: Partial<CSSStyleDeclaration>;
};

export type ParamsOmitTag<T extends HTMLElement = HTMLElement> = Omit<
  Params<T>,
  'tag'
>;

export type Route = {
  path: string;
  callback: () => void;
};

export type WSData = {
  id: string | null;
  type: string;
  payload: object;
};

export type AuthenticationData = {
  user: {
    login: string;
    password: string;
  };
};

export const loginRegExp = /^[A-Z]/;

export const passwordRegExp = /.*[A-Z].*/;

export type User = {
  login: string;
  isLogined: boolean;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Status;
};

export type Status = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

export type ResponseData = {
  id: string;
  type: string;
};

export type ResponseLoginErrorData = ResponseData & {
  payload: {
    error: string;
  };
};

export type ResponseUserData = ResponseData & {
  payload: {
    user: User;
  };
};

export type ResponseAllUsersData = ResponseData & {
  payload: {
    users: User[];
  };
};

export type ResponseMessageData = ResponseData & {
  payload: {
    message: Message;
  };
};

export type ResponseAllMessagesData = ResponseData & {
  payload: {
    messages: Message[];
  };
};

export type ResponseDeliveredStatusData = ResponseData & {
  payload: {
    message: {
      id: string;
      status: {
        isDelivered: boolean;
      };
    };
  };
};

export type ResponseReadStatusData = ResponseData & {
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
};

export type ResponseEditStatusData = ResponseData & {
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
};

export type ResponseDeleteMessageData = ResponseData & {
  payload: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
};

export const widthToHideUsers = 600;
