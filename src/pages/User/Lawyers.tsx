import { Component, useEffect, useState } from "react";
import LawyerCard from "../../components/LawyerCard";
import Show from "../../components/other/Show";
import { fetchLawyer } from "../../api/UserApi";
import ReactLoading from "react-loading";

export default function Lawyers() {
  const [search, setSearch] = useState<string>("");
  const [lawyers, setLawyers] = useState([]);
  const [loading,setLoading] = useState<boolean>(false);

  const fetchLaywers = async (search) => {
    setLoading(true)
    try {
      const data = await fetchLawyer(search);
      setLawyers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchLaywers(search);
  }, [search]);

  return (
    <>
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
        <div className="flex flex-col dark:bg-darkcard w-full h-screen items-center justify-center">
          <div className="w-[70%] h-full">
            <div className="h-1/5 flex justify-center items-center">
              <div className="w-full p-2 dark:bg-dark dark:text-white flex items-center border-gray border-2 rounded-lg">
                <input
                  type="search"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearch(e.currentTarget.value);
                    }
                  }}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  className=" dark:bg-dark dark:text-white w-full border-none outline-none ring-0 focus:ring-0 hover:border-none focus:border-none hover:ring-0 hover:outline-none h-[40px] px-4"
                  autoComplete="true"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full h-[50%] gap-4 overflow-auto grid mb-2 grid-cols-2">
              {lawyers.map((lawyer) => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
