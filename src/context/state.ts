import { Dispatch, createContext } from "react";
import { Mail } from "../utils/types";

export interface AppState {
  currentMail: Mail | null;
  mails: Mail[];
  folders: string[];
  currentFolder: string;
  isLogin: boolean;
}

export type AppAction =
  | { type: "LOGINED"; isLogin: boolean }
  | { type: "SET_CURRENT_MAIL"; mail: Mail }
  | { type: "SET_CURRENT_FOLDER"; folder: string }
  | { type: "ADD_MAILS"; mails: Mail[] }
  | { type: "DEL_MAIL"; mail: Mail };

export interface AppStateType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppStateType>({} as AppStateType);

// Login State
export interface LoginState {
  account?: LoginAccountInfo;
  imap?: MailServerInfo;
  smtp?: MailServerInfo;
}

export interface LoginAccountInfo {
  account: string;
  password: string;
}

export enum MailServerSecret {
  TLS = "TLS",
  AUTO = "AUTO",
  NONE = "NONE",
}

export interface MailServerInfo {
  server: string;
  account?: LoginAccountInfo;
  port: number;
  secret?: MailServerSecret;
}

export type LoginAction =
  | { type: "SET_ACCOUNT"; account: LoginAccountInfo }
  | { type: "SET_IMAP"; imap: MailServerInfo }
  | { type: "SET_SMTP"; smtp: MailServerInfo };

export interface LoginStateType {
  state: LoginState;
  dispatch: Dispatch<LoginAction>;
}

export const LoginContext = createContext<LoginStateType>({} as LoginStateType);
