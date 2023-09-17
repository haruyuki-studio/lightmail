import {
  AppAction,
  AppState,
  LoginAction,
  LoginState,
  LoginPage,
} from "./state";

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGINED":
      return { ...state, isLogin: action.isLogin };
    case "SET_CURRENT_MAIL":
      return { ...state, currentMail: action.mail };
    case "SET_CURRENT_FOLDER":
      return { ...state, currentFolder: action.folder };
    case "ADD_MAILS": {
      return {
        ...state,
        mails: [...state.mails, ...action.mails].filter(
          (mail, index, self) => self.indexOf(mail) === index,
        ),
      };
    }
    case "DEL_MAIL": {
      return {
        ...state,
        mails: state.mails.splice(state.mails.indexOf(action.mail)),
      };
    }
    default:
      throw new Error();
  }
}

export function LoginReducer(
  state: LoginState,
  action: LoginAction,
): LoginState {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        state: LoginPage.IMAP,
        imap: action.imap,
        smtp: action.smtp,
      };
    case "SET_IMAP":
      return { ...state, state: LoginPage.SMTP, imap: action.imap };
    case "SET_SMTP":
      return { ...state, state: LoginPage.Loading, smtp: action.smtp };
    default:
      throw new Error();
  }
}
