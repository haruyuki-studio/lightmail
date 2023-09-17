import { useContext, useState } from "react";
import { LoginContext, MailServerSecret } from "../../context/state";
import { TEInput, TERipple } from "tw-elements-react";

export default () => {
  const { dispatch } = useContext(LoginContext);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Account"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <p>Setup your Account.</p>
          <p>Step 1.</p>
        </h2>
      </div>
      <div className="block max-w-sm flex-auto rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form>
          {/* <!--E-mail input--> */}
          <TEInput
            type="email"
            label="Email address"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <small
              id="emailHelp"
              className="absolute w-full text-neutral-500 dark:text-neutral-200"
            >
              We'll never share your email with anyone else.
            </small>
          </TEInput>

          {/* <!--Password input--> */}
          <TEInput
            type="password"
            label="Password"
            className="mt-12 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TEInput>

          {/* <!--Submit button--> */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="button"
              className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
              onClick={() => {
                // TODO: check server info and auto input
                dispatch({
                  type: "SET_ACCOUNT",
                  imap: {
                    account,
                    password,
                    server: "",
                    port: 0,
                    secret: MailServerSecret.AUTO,
                  },
                  smtp: {
                    account,
                    password,
                    server: "",
                    port: 0,
                    secret: MailServerSecret.AUTO,
                  },
                });
              }}
            >
              Next
            </button>
          </TERipple>
        </form>
      </div>
    </div>
  );
};
