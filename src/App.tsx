import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import MailList from "./components/MailList";
import MailPreview from "./components/MailPreview";
import { folders, mails } from "./context";
import { AppContext, AppState } from "./context/state";
import { reducer } from "./context/reducer";
import Login from "./components/Login";

function App() {
  const initialState: AppState = {
    currentMail: null,
    mails: [],
    folders: folders, // TODO: move to action
    currentFolder: "",
    isLogin: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [login, setLogin] = useState(state.isLogin);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_FOLDER", folder: "Inbox" });
    mails.forEach((mail) => {
      dispatch({ type: "ADD_MAILS", mails: [mail] });
    });
  }, [mails]);

  useEffect(() => {
    setLogin(state.isLogin);
  }, [state.isLogin]);

  return (
    <div className="container">
      <div className="flex flex-row space-x-1">
        <AppContext.Provider value={{ state, dispatch }}>
          {login ? (
            <>
              <Folder />
              <MailList />
              <MailPreview />
            </>
          ) : (
            <Login />
          )}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
