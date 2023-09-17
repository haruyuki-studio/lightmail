import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/state";
import { invoke } from "@tauri-apps/api/tauri";

export default () => {
  const { state } = useContext(LoginContext);
  useEffect(() => {
    const login = async () => {
      await invoke("set_imap_info", { ...state.imap });
      await invoke("set_smtp_info", { ...state.smtp });
      await invoke("login");
    };
    login().catch(console.error);
  }, [state.imap, state.smtp]);

  return (
    <>
      <div>loading...</div>
    </>
  );
};
