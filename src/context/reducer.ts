import { AppAction, AppState } from "./state";

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
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
