import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteChatHistory, fetchChatHistory } from "../api/UserApi";
import { RefreshContext } from "../context/Refresh";

export default function History() {
  const [history, setChatHistory] = useState([]);
  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(RefreshContext);

  const fetchHistory = async () => {
    try {
      const data = await fetchChatHistory();
      setChatHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChat = async (id) => {
    try {
      await deleteChatHistory(id);
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  const handleChatClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      {history.map((message) => (
        <div
          key={message.id}
          onClick={() => handleChatClick(message.id)}
          className="h-[50px] dark:text-white p-1 flex text-black items-center hover:rounded-md hover:bg-active justify-between hover:text-white w-full"
        >
          <div className="flex flex-row h-full items-center p-2 w-4/5 gap-2 overflow-hidden">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <span className="flex-shrink-0 overflow-hidden whitespace-nowrap">
                {message.title}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteChat(message.id);
            }}
            className="p-3 text-maroon hover:outline-none hover:border-none hover:ring-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
}
