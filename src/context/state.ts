import { Dispatch, createContext } from "react";
import { Mail } from "../utils/types";

export interface AppState {
  currentMail: Mail | null;
  mails: Mail[];
  folders: string[];
  currentFolder: string;
}

export type AppAction =
  | { type: "SET_CURRENT_MAIL"; mail: Mail }
  | { type: "SET_CURRENT_FOLDER"; folder: string }
  | { type: "ADD_MAILS"; mails: Mail[] }
  | { type: "DEL_MAIL"; mail: Mail };

export interface AppStateType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppStateType>({} as AppStateType);
