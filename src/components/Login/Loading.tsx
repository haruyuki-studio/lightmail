import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/state";

export default () => {
  const { state } = useContext(LoginContext);
  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <div>loading...</div>
    </>
  );
};
