import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/state";
import { Mail } from "../utils/types";

export default () => {
  const { state } = useContext(AppContext);
  const [mail, setMail] = useState<Mail | null>(null);

  useEffect(() => {
    setMail(state.currentMail);
    console.log(state.currentMail);
  }, [state.currentMail]);

  return mail === null ? (
    <div>Preview</div>
  ) : (
    <div className="container">
      <div className="bg">
        <h1>title: {mail.subject}</h1>
        <p>from: {mail.from?.address}</p>
        <p>to: {mail.to?.map((c) => c.address)}</p>
        <div>{mail.raw}</div>
        <div dangerouslySetInnerHTML={{ __html: mail.html! }} />
      </div>
    </div>
  );
};
