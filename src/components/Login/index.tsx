import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext, LoginContext } from "../../context/state";
import { LoginReducer } from "../../context/reducer";
import SMTP from "./SMTP";
import IMAP from "./IMAP";
import Account from "./Account";
import Loading from "./Loading";

enum Page {
  Account = "Account",
  IMAP = "IMAP",
  SMTP = "SMTP",
  Loading = "Loading",
}

export default () => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [state, dispatch] = useReducer(LoginReducer, {});

  const [page, setPage] = useState(Page.Account);

  useEffect(() => {
    if (state.smtp) {
      setPage(Page.Loading);
      return;
    }

    if (state.imap) {
      setPage(Page.SMTP);
      return;
    }

    if (state.account) {
      setPage(Page.IMAP);
      return;
    }
  }, [state.account, state.imap, state.smtp]);

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {page === Page.Account ? (
        <Account />
      ) : page === Page.IMAP ? (
        <IMAP />
      ) : page === Page.SMTP ? (
        <SMTP />
      ) : (
        <Loading />
      )}
    </LoginContext.Provider>
  );
};
