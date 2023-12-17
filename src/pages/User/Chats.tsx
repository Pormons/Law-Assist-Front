import { Component, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import History from "../../components/History";
import Chat from "../../components/Chat";
import NewChat from "../../components/NewChat";

export default function Chats(){
  
  const navigate = useNavigate();
  const handleNewChat = () => {
    navigate(`/Home/Chats/new`);
  };
    return (
        <div className="flex dark:bg-darkside w-full h-screen">
          <div className="md:w-3/12 dark:bg-dark bg-white md:border-x-2 md:border-gray flex flex-col justify-items-center p-4">
            <button onClick={(e)=>{
              handleNewChat();
            }} className="my-3 h-10 rounded-md hover:bg-hover bg-maroon text-white ">+ New Chat</button>
            <div className="md:w-full my-3">
              <History />
            </div>
          </div>
          <div className="flex flex-col md:w-3/4">
            <Routes>
                <Route path="/:id" element={<Chat />} />
                <Route path="/new" element={<NewChat />} />
            </Routes>
          </div>
        </div>
    );
  }
