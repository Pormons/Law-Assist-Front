import {
  faArrowRightFromBracket,
  faGear,
  faScaleBalanced,
  faTachometer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/AuthApi";

export default function AdminBar() {
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const data = await logout();
      console.log(data);
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
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
            to={"Dashboard"}
            className="h-[50px] dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
          >
            <FontAwesomeIcon icon={faTachometer} className="w-5 h-5" />
            <span className="md:block hidden">Dashboard</span>
          </NavLink>
          <NavLink
            to={"Lawyers"}
            className="h-[50px] dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
          >
            <FontAwesomeIcon icon={faScaleBalanced} className="w-5 h-5" />
            <span className="md:block hidden">Lawyers</span>
          </NavLink>
          <NavLink
            to={"Users"}
            className="h-[50px] dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
          >
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
            <span className="md:block hidden">Users</span>
          </NavLink>
          <NavLink
            to={"Settings"}
            className="h-[50px] dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
          >
            <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
            <span className="md:block hidden">Settings</span>
          </NavLink>
          <li
            onClick={() => {
              handlelogout();
            }}
            className="h-[50px] cursor-pointer dark:text-white flex text-black hover:bg-active md:space-x-2 hover:text-white w-full items-center px-6 md:px-7 gap-1"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-5 h-5"
            />
            <span className="md:block hidden">Log out</span>
          </li>
        </div>
      </aside>
    </>
  );
}
