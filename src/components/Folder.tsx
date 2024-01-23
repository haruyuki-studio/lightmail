import { useContext, useEffect, useState } from "react";
import { Mail } from "../utils/types";
import { AppContext, AppState } from "../context/state";
import { invoke } from "@tauri-apps/api";

const folderKeep = ["Inbox", "Sent", "Drafts", "Trash"];

// function mailsByFolder(state: AppState, folder: string): Mail[] {
//   let mails: Mail[] = [];
//   for (let mail of state.mails) {
//     if (mail.folder === folder) {
//       mails.push(mail);
//     }
//   }
//   return mails;
// }

export default () => {
  const { state, dispatch } = useContext(AppContext);
  const [mails, setMails] = useState(state.mails);
  const [folders, setFolders] = useState([] as string[]);
  const [currentFolder, setCurrentFolder] = useState(state.currentFolder);

  useEffect(() => {
    setMails(state.mails);
    setCurrentFolder(state.currentFolder);
  }, [state.mails, state.currentFolder]);

  // useEffect(() => {
  //   let folders: string[] = [];
  //   for (let mail of mails) {
  //     let isFound = false;
  //     for (let f of folders) {
  //       if (f == mail.folder) {
  //         isFound = true;
  //         break;
  //       }
  //     }

  //     if (!isFound) {
  //       folders.push(mail.folder);
  //     }
  //   }

  //   folders.sort((a, b) => {
  //     if (folderKeep.includes(a) && folderKeep.includes(b)) {
  //       return folderKeep.indexOf(a) - folderKeep.indexOf(b);
  //     } else if (folderKeep.includes(a)) {
  //       return -1;
  //     } else if (folderKeep.includes(b)) {
  //       return 1;
  //     } else {
  //       return a === b ? 0 : a < b ? -1 : 1;
  //     }
  //   });
  //   setFolders(folders);
  // }, [mails]);

  return (
    <div className="flex-none w-28">
      <ul>
        {folders.map((folder) => {
          const isCurrent = currentFolder === folder;
          return (
            <li
              key={folder}
              className={`flex justify-between border-l-4 ${
                isCurrent ? "bg-blue-100 border-l-blue-500" : ""
              }`}
              onClick={() =>
                dispatch({
                  type: "SET_CURRENT_FOLDER",
                  folder,
                })
              }
            >
              <div className="flex flex-auto min-w-0 justify-between items-center">
                <p className="m-1 flex-auto min-w-0 overflow-hidden text-sm">
                  {folder}
                </p>
                <p className="mr-2 text-sm">
                  // {mailsByFolder(state, folder).length}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
