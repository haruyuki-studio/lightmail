import { useContext, useEffect, useState } from "react";
import startIcon from "../assets/starred-message.png";
import unStartIcon from "../assets/un-starred-message.png";
import { AppContext } from "../context/state";

function formatDateTime(date: Date) {
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let theDayBeforeYesterday = new Date(today);
  theDayBeforeYesterday.setDate(theDayBeforeYesterday.getDate() - 2);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // 如果hour是0，则显示为12

  let formattedDate;
  if (date.getTime() === today.getTime()) {
    formattedDate = `Tody, ${hour}:${minute} ${ampm}`;
  } else if (date.getTime() === yesterday.getTime()) {
    formattedDate = `Yesterday, ${hour}:${minute} ${ampm}`;
  } else {
    formattedDate = `${year}/${month}/${day}, ${hour}:${minute} ${ampm}`;
  }

  return formattedDate;
}

export default () => {
  const { state, dispatch } = useContext(AppContext);

  const [mails, setMails] = useState(state.mails);

  useEffect(() => {
    // setMails(state.mails.filter((mail) => mail.folder === state.currentFolder));
    setMails(state.mails);
  }, [state.mails, state.currentFolder]);

  return (
    <div className="flex-none w-96">
      <ul className="border divide-y divide-slate-100">
        {mails.map((mail) => (
          <li
            key={mail._id}
            className="flex justify-between hover:shadow-md"
            onClick={() => dispatch({ type: "SET_CURRENT_MAIL", mail: mail })}
          >
            <div className="flex min-w-0 space-x-1">
              <img
                src={mail.avatar}
                className="w-6 h-6 m-2 mt-4 flex-none rounded-full shadow-xl"
              />
              <div className="min-w-0 flex-auto space-y-2 mt-2 mb-2">
                <div className="flex justify-between items-center">
                  <p className="text-ellipsis overflow-hidden text-sm">
                    {mail.from!.address}
                  </p>
                  <p className="mr-2 whitespace-nowrap text-xs font-light">
                    {formatDateTime(mail.date!)}
                  </p>
                </div>
                <div className="flex">
                  <div className="min-w-0 flex-auto flex-col space-y-2">
                    <p className="text-ellipsis overflow-hidden text-sm font-semibold">
                      {mail.subject!}
                    </p>
                    <p className="text-ellipsis overflow-hidden max-w-full text-xs font-light">
                      {mail.html}
                    </p>
                  </div>
                  <div className="contents">
                    {true ? (
                      <img
                        className="w-4 h-4 ml-10 mr-2 mt-auto"
                        src={startIcon}
                      />
                    ) : (
                      <img
                        className="w-4 h-4 ml-10 mr-2 mt-auto"
                        src={unStartIcon}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
