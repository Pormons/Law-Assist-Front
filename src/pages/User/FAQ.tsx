import { useEffect, useState } from "react";
import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function FAQ() {
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(true);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = async () => {
    const newMessage = {
      id: 1,
      bot: false,
      message: message,
    };

    setChat((prevChat) => [...prevChat, newMessage]);

    const token = sessionStorage.getItem("token");
    setTyping(false);

    const response = await fetch(`https://law-backend.up.railway.app/api/LawyerChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chat: message,
        chatId: null,
      }),
    });

    const data = await response.json();
    console.log(data);
    setTyping(true);
    setChat((prevChat) => [...prevChat, data]);

    setMessage("");
    setDisable(false);
  };

  return (
    <>
      <div className="h-screen w-full">
        <Show
          loading={loading}
          fallback={
            <div className="h-screen w-full flex flex-col items-center justify-center">
              <ReactLoading
                type="bubbles"
                color="#6A0A2D"
                height={100}
                width={100}
              />
            </div>
          }
        >
          <div className="bg-maroon h-[13%] space-x-5 flex flex-row justify-start items-center p-4 text-white">
            <FontAwesomeIcon
              icon={faUser}
              className="w-10 h-10 border bg-gray p-2 rounded-full"
            />
            <div className="flex flex-col justify-start">
              <span className="font-semibold text-[20px]">
                FAQ 
              </span>
            </div>
          </div>
          <div className="flex dark:bg-darkside flex-col h-[77%] overflow-y-auto justify-start">
            {chat.map((data) =>
              data.bot ? (
                <div
                  key={data.id}
                  className="p-4 flex text-justify space-x-2 items-center font-semibold"
                >
                                  <FontAwesomeIcon
                  icon={faUser}
                  className="w-10 h-10 border p-2 rounded-full"
                />
                  <div className=" bg-gray-500 text-[30px] h-full flex p-2 rounded-br-xl rounded-t-xl">
                    {data.message}
                  </div>
                </div>
              ) : (
                <div
                  key={data.id}
                  className="p-4 flex flex-row-reverse w-full items-center gap-2"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-10 h-10 border p-2 rounded-full"
                  />
                  <div className="bg-maroon text-white text-[30px] h-full flex p-2 rounded-bl-xl rounded-tl-xl rounded-tr-xl">
                    {data.message}

                  </div>
                </div>
              )
            )}
            <Show loading={typing} fallback={<></>}>
              <div className="p-4 flex text-justify space-x-2 items-center font-semibold">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-10 h-10 border p-2 rounded-full"
                />
                <div className="bg-gray-500 text-[30px] h-full flex p-2 rounded-br-xl rounded-t-xl">
                  <ReactLoading
                    type="bubbles"
                    color="#6A0A2D"
                    height={20}
                    width={50}
                  />
                </div>
              </div>
            </Show>
          </div>
          <div className="dark:bg-darkcard flex flex-row h-[10%] border-t-2 justify-center items-center w-full gap-2 p-1">
            <input
              onInput={(e) => {
                setMessage(e.currentTarget.value);
              }}
              value={message}
              type="text"
              className="w-[90%] dark:bg-darkside dark:text-white border-2 p-2 rounded h-12"
              name=""
              id=""
              disabled={disable}
            />
            <button
              disabled={!message || disable}
              onClick={(e) => {
                sendChat();
              }}
              type="button"
              className={
                !chat || disable
                  ? "hover:border-none border-none text-gray dark:text-white"
                  : "hover:text-maroon hover:border-none border-none dark:text-white cursor-pointer"
              }
            >
              {disable ? (
                <ReactLoading
                  type="spin"
                  color="#6A0A2D"
                  height={20}
                  width={20}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </div>
        </Show>
      </div>
    </>
  );
}
