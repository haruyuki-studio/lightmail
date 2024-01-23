import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import MailList from "./components/MailList";
import MailPreview from "./components/MailPreview";
import { mails } from "./context";
import { AppContext, AppState } from "./context/state";
import { reducer } from "./context/reducer";
import Login from "./components/Login";
import { invoke } from "@tauri-apps/api";
import { Box, Mail } from "./utils/types";
import { extract } from "letterparser";
import { FetchResponse } from "./utils/types";
import utf8 from "utf8";

function App() {
  const initialState: AppState = {
    currentMail: null,
    mails: [],
    // folders: folders, // TODO: move to action
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
    async function fetch() {
      if (state.isLogin) {
        try {
          function createNode(array: string): Box {
            let t = array.split("/");
            let box: Box = {
              children: [],
              name: "",
            };

            let name = t.reverse().pop();
            if (name) {
              box.name = name;
            }
            if (t.length != 0) {
              box.children.push(createNode(t.join("/")));
            }

            return box;
          }
          function mergeNode(boxes: Box[]): Box[] {
            let arr: Box[] = [];
            if (!Array.isArray(boxes) || !boxes.length) {
              return arr;
            }
            boxes.forEach((box) => {
              const index = arr.findIndex((i) => i.name == box.name);
              if (index > 1) {
                arr[index].children = mergeNode([
                  ...arr[index].children,
                  ...box.children,
                ]);
              } else {
                arr.push({ ...box, children: mergeNode(box.children) });
              }
            });

            return arr;
          }

          let rootBox: Box[] = [];
          for (let box of await invoke<string[]>("list", {
            mailboxPattern: "*",
          })) {
            let node = createNode(box);
            rootBox.push(node);
          }
          console.log(mergeNode(rootBox));
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetch();
  }, [state]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row space-x-1 h-full">
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
