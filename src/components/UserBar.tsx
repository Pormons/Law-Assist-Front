import {
  faCircleQuestion,
  faGear,
  faMessage,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function UserBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch(`https://law-backend.up.railway.app/api/Logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        console.log("Logout successful");
        sessionStorage.removeItem('token');
        navigate('/');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  
    return (
      <>
        <aside className="fixed dark:bg-darkside top-0 left-0 z-40 md:w-64 w-16 h-screen shadow-md">
          <div className="hidden md:block mt-9 px-6">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex flex-col items-center">
            <span className="hidden md:block h-[2.05px] bg-gray w-[190px] mt-6 mb-4"></span>
            <span className="md:hidden h-[2.05px] w-[190px] mt-6 mb-4"></span>
            <NavLink
              to={"Chats"}
              className="h-[50px] flex dark:text-white text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
            >
              <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
              <span className="md:block hidden">Chats</span>
            </NavLink>
            <NavLink
              to={"Lawyers"}
              className="h-[50px] flex dark:text-white text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
            >
              <FontAwesomeIcon icon={faSuitcase} className="w-5 h-5" />
              <span className="md:block hidden">Lawyers</span>
            </NavLink>
            <span className="h-[2.05px] w-[190px] bg-gray-400 mt-6 mb-4"></span>
            <NavLink
              to={"Settings"}
              className="h-[50px] dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
            >
              <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
              <span className="md:block hidden">Settings</span>
            </NavLink>
            <NavLink
              to={"FAQ"}
              className="h-[50px] flex dark:text-white text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
            >
              <FontAwesomeIcon icon={faCircleQuestion} className="w-5 h-5" />
              <span className="md:block hidden">FAQ</span>
            </NavLink>
            <div className="flex flex-col absolute bottom-0">
            <span className="h-[2.05px] w-[190px] bg-gray-400 mt-6 mb-4"></span>
              <div className="h-[90px] flex justify-center items-center">
                                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=" w-16 h-16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="w-full dark:text-white flex flex-col">
                    <span><strong>Fermin L. Fauta</strong></span>
                    <span>@username</span>
                  </div>
                  <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                  </svg>
                  </button>

                  <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <div className="py-2">
                        <a href="#" onClick={(e)=>{
                          handleLogout()
                        }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</a>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }