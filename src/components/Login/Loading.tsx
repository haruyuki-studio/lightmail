import { useContext, useEffect } from "react";
import { AppContext, LoginContext } from "../../context/state";
import { invoke } from "@tauri-apps/api/tauri";

export default () => {
  const { state } = useContext(LoginContext);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    async function login() {
      try {
        console.log(
          await invoke("login", {
            imap: state.imap,
            smtp: state.smtp,
          }),
        );
        dispatch({
          type: "LOGINED",
          isLogin: true,
        });
      } catch (e) {
        console.error(e);
        dispatch({
          type: "LOGINED",
          isLogin: false,
        });
      }
    }

    login();

    return () => {};
  }, []);

  return (
    <>
      <div>loading...</div>
    </>
  );
};
