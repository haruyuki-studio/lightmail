import { useEffect, useReducer, useState } from "react";
import { LoginContext, LoginPage, LoginState } from "../../context/state";
import { LoginReducer } from "../../context/reducer";
import SMTP from "./SMTP";
import IMAP from "./IMAP";
import Account from "./Account";
import Loading from "./Loading";

export default () => {
  // const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [state, dispatch] = useReducer(LoginReducer, {
    state: LoginPage.Account,
  } as LoginState);

  const [page, setPage] = useState(LoginPage.Account);

  useEffect(() => {
    setPage(state.state);
  }, [state.state]);

  return (
    <div className="container">
      <LoginContext.Provider value={{ state, dispatch }}>
        {page === LoginPage.Account ? (
          <Account />
        ) : page === LoginPage.IMAP ? (
          <IMAP />
        ) : page === LoginPage.SMTP ? (
          <SMTP />
        ) : (
          <Loading />
        )}
      </LoginContext.Provider>
    </div>
  );
};
