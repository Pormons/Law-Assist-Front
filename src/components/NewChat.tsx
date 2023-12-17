import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import ReactLoading from "react-loading";
import Show from "./other/Show";
import { useNavigate, useParams } from "react-router-dom";
import useSpeechToText from "react-hook-speech-to-text";
import { RefreshContext, RefreshProvider } from "../context/Refresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function NewChat() {
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  const { id } = useParams();
  const { setRefresh } = useContext(RefreshContext);

  const {
    error,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const sendChat = async () => {
    setResults([]);
    const newMessage = {
      chatId: id, // or some unique identifier
      bot: false,
      message: message,
    };
    setDisable(true);
    setChat((prevChat) => [...prevChat, newMessage]);

    const token = sessionStorage.getItem("token");
    console.log(token);
    setMessage("");
    const response = await fetch(
      `https://law-backend.up.railway.app/api/Chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat: message,
          chatId: id ? id : null,
        }),
      }
    );

    const data = await response.json();
    navigate(`/Home/Chats/${data.chatId}`);
    setRefresh(true);
    setDisable(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setMessage(
      (prevText) =>
        `${prevText ? prevText + " " : ""}${results
          .map((result) => result.transcript)
          .join(" ")}`
    );
  }, [results]);

  return (
    <>
      <div className="h-[90%]">
        <div className="bg-maroon h-[13%] flex flex-col justify-center items-center p-4 text-white">
          <span className="font-semibold text-[20px]">New Chat</span>
          <span></span>
        </div>
        <div
          className="flex flex-col h-[77%] overflow-y-auto justify-start"
        >
          {chat.map((data) =>
            data.bot ? (
              <div
                key={data.id}
                className="dark:bg-darkcard dark:text-white bg-active p-4 text-justify font-semibold"
              >
                <span>
                  {data.message}
                </span>
              </div>
            ) : (
              <div
                key={data.id}
                className="p-4 dark:bg-darkside dark:text-white flex flex-row w-full items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-14 h-14"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{data.message}</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-row h-[10%] border-t-2 justify-center items-center w-full gap-2 p-1">
        <button
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
          className="hover:text-maroon dark:text-white hover:border-none border-none"
        >
          <Show loading={isRecording} fallback={
            <FontAwesomeIcon icon={faMicrophone} size="xl" /> }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          </Show>
        </button>
        <input
          onInput={(e) => {
            setMessage(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendChat();
            }
          }}
          value={message}
          type="text"
          className="w-[90%] border-2 p-2 rounded h-12"
          name=""
          id=""
          disabled={disable}
        />
        <button
          disabled={!chat || disable}
          onClick={(e) => {
            sendChat();
          }}
          type="button"
          className={
            !chat || disable
              ? "hover:border-none border-none text-gray dark:text-white"
              : "hover:text-maroon hover:border-none border-none dark:text-white"
          }
        >
          {disable ? (
            <ReactLoading type="spin" color="#6A0A2D" height={20} width={20} />
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
    </>
  );
}
