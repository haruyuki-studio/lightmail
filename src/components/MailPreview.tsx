import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/state";
import { Mail } from "../utils/types";

export default () => {
  const { state } = useContext(AppContext);
  const [mail, setMail] = useState<Mail | null>(null);

  useEffect(() => {
    setMail(state.currentMail);
  }, [state.currentMail]);

  return mail === null ? (
    <div>Preview</div>
  ) : (
    <div className="container">
      <div className="bg">
        <h1>title: {mail.title}</h1>
        <p>from: {mail.from}</p>
        <p>to: {mail.to}</p>
        <h5>body: {mail.body}</h5>
      </div>
    </div>
  );
};
