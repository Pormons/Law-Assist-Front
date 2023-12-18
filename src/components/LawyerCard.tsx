import React from "react";
import { useNavigate } from "react-router-dom";

export default function LawyerCard(props) {
    const navigate = useNavigate();


    const fetchInfo = (id) =>{
        navigate(`/Home/Lawyers/${id}`);
    }

  return (
    <div onClick={(e)=>{
        fetchInfo(props.lawyer.id)
    }} className="rounded-lg dark:bg-darkside dark:text-white border-gray-500 border-2 hover:shadow-lg cursor-pointer flex h-[100px] px-4 col-span-1">
      {/* Lawyer Avatar */}
      <div className="h-full flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="flex flex-col justify-center ml-4">
        <span className="font-bold text-xl dark:text-white text-black">{props.lawyer.name}</span>
        <span className=" text-gray-800 dark:text-white">{props.lawyer.address}, {props.lawyer.region}</span>
        <span className="text-gray-800 dark:text-white">{props.lawyer.email}</span>
      </div>
    </div>
  );
}
