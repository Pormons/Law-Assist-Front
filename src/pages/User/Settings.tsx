import Show from "../../components/other/Show";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import Switcher from "../../components/other/Switcher";

export default function Settings() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  
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
            <div className="h-full rounded-lg w-[30%] flex flex-col gap-4">
              <div className="border bg-gray-200 p-4 rounded-lg">
                <div className="mb-4">
                  <label
                    htmlFor="darkMode"
                    className="block mb-4 text-sm font-medium text-gray-700"
                  >
                    Dark Mode
                  </label>
                  <Switcher id="darkMode" />
                </div>

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
                  </select>
                </div>

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
                  </select>
                </div>
              </div>
            </div>
        </Show>
      </div>
    </>
  );
}
