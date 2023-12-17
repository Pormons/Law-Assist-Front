import React, { useState } from "react";
import Show from "./other/Show";
import ReactLoading from "react-loading";
import { deleteLawyerinfo } from "../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";


export default function DeleteModal(props) {
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteLawyer = async (id) => {
    setLoading(true);
    try {
      await deleteLawyerinfo(id);
      props.refetch()
      setShowModal(true);
      setTimeout(()=>{
        setLoading(false);
      },5000)
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Something went Wrong')
    }
  };

  return (
    <>
    <ToastContainer />
      <button
        onClick={(e) => {
          setShowModal(false);
        }}
      >
        Delete
      </button>
      <Show loading={showModal} fallback={null}>
        <Show
          loading={loading}
          fallback={
            <div className="h-screen w-screen bg-gray bg-opacity-50 flex flex-col items-center justify-center z-50 fixed top-0 left-0">
              <ReactLoading
                type="bubbles"
                color="#6A0A2D"
                height={100}
                width={100}
              />
            </div>
          }
        >
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-[30%]">
              {/*content*/}
              <div className="border-0 dark:bg-darkcard rounded-lg h-full shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start h-[8%] justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-sm font-semibold">Delete User</h3>
                  <button
                    className=" hover:text-black hover:opacity-100 ml-auto border-0 text-black opacity-10 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/*body*/}

                  <div className="relative p-4">
                    Are You Sure You Want To Delete {props.name}

                  </div>
                  {/*footer*/}
                  <div className="p-4 border-t border-solid justify-between border-blueGray-200 rounded-b flex flex-grow">
                    <button
                      className="text-red-500 hover:bg-red-500 hover:text-white hover:rounded-md background-transparent font-bold uppercase px-6 py-2 text-[15px] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-maroon text-white active:bg-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=>{
                        deleteLawyer(props.id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Show>
      </Show>
    </>
  );
}
