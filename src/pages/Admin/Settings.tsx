import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "../../components/ProfileModal";
import Switcher from "../../components/other/Switcher";
import { loggedIn } from "../../api/AdminApi";

export default function Settings() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await loggedIn();
      setUser(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    // Trigger the click event of the file input when "Edit" is clicked
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full p-5 md:px-20 md:py-10 dark:bg-dark dark:text-white">
        <div className="h-24">
          <span className="text-[50px] font-semibold">Settings</span>
        </div>
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
          <div className="flex flex-row p-3 justify-center gap-4 h-[80%] rounded-lg ">
            <div className="dark:bg-darkcard shadow-xl h-full border rounded-lg w-[40%] p-6 flex flex-col items-center">
              <div className="relative w-[13rem] h-[13rem] mb-4 overflow-hidden rounded-full border-4 border-white group">
                <img
                  src="https://i.stack.imgur.com/l60Hf.png"
                  alt="Profile"
                  className="object-cover border w-full h-full rounded-full transition-transform transform group-hover:scale-105"
                />

                <label
                  htmlFor="uploadInput"
                  className="bg-maroon text-white px-4 py-2 rounded-full absolute bottom-[4px] left-[74px] opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                  onClick={handleEditClick}
                >
                  Edit
                </label>

                <input type="file" id="uploadInput" className="hidden" />
              </div>

              <p className="text-[40px] font-semibold mb-2 mt-2">{user.name}</p>

              <p className="text-base text-gray-500 mb-4">{user.username}</p>

              <div className="mt-10">
                <ProfileModal id={user.id} refetch={fetchUser} />
              </div>
            </div>

            <div className="h-full rounded-lg w-[30%] flex flex-col gap-4">
              {/* Card 1 */}
              <div className="border bg-gray-200 p-4 rounded-lg">
                {/* Dark Mode Switcher */}
                <div className="mb-4">
                  <label
                    htmlFor="darkMode"
                    className="block mb-4 text-sm font-medium text-gray-700"
                  >
                    Dark Mode
                  </label>
                  <Switcher id="darkMode" />
                </div>

                {/* Language dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    className="mt-1 p-2 dark:bg-darkcard border rounded-md"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    {/* Add more language options as needed */}
                  </select>
                </div>

                {/* Font dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="font"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Font
                  </label>
                  <select
                    id="font"
                    name="font"
                    className="mt-1 dark:bg-darkcard p-2 border rounded-md"
                  >
                    <option value="arial">Arial</option>
                    <option value="times-new-roman">Times New Roman</option>
                    {/* Add more font options as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}
