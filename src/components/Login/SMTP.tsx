import { Fragment, useContext, useEffect, useState } from "react";
import { LoginContext, MailServerSecret } from "../../context/state";
import { TEInput, TERipple } from "tw-elements-react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const secret = Object.values(MailServerSecret);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default () => {
  const { state, dispatch } = useContext(LoginContext);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [port, setPort] = useState(465);
  const [accountVisible, setAccountVisible] = useState(false);
  const [selected, setSelected] = useState(secret[0]);

  useEffect(() => {
    if (state.account) {
      setAccount(state.account.account);
      setPassword(state.account.password);
    }
  }, [state.account]);

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
          <p>Step 3.</p>
        </h2>
      </div>
      <div className="block max-w-sm flex-auto rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form className="space-y-6">
          <div>
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={accountVisible}
              onChange={() => setAccountVisible(!accountVisible)}
            />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="flexSwitchCheckDefault"
            >
              Setup SMTP Account info
              <p className="text-xs">The default is the email account</p>
            </label>
          </div>

          {accountVisible ? (
            <>
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

              <TEInput
                type="password"
                label="Password"
                className="mt-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>
            </>
          ) : (
            <></>
          )}

          <div>
            <TEInput
              type="text"
              label="SMTP address"
              value={server}
              onChange={(e) => setServer(e.target.value)}
            ></TEInput>
          </div>

          <div>
            <TEInput
              type="number"
              value={port}
              onChange={(e) => setPort(+e.target.value)}
            ></TEInput>
          </div>

          <div>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }: { open: boolean }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{selected}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {secret.map((item) => (
                          <Listbox.Option
                            key={item}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9",
                              )
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "ml-3 block truncate",
                                    )}
                                  >
                                    {item}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4",
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                  <Listbox.Label className="block text-xs font-medium leading-6 text-gray-900">
                    Secret Method
                  </Listbox.Label>
                </>
              )}
            </Listbox>
          </div>

          {/* <!--Submit button--> */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="button"
              className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
              onClick={() => {
                dispatch({
                  type: "SET_SMTP",
                  smtp: {
                    account: {
                      account,
                      password,
                    },
                    server,
                    port,
                    secret: selected,
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
