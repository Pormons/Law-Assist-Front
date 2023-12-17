import React, { useEffect, useState } from "react";
import Show from "./other/Show";
import { createDealer, editLawyerInfo } from "../api/AdminApi";
import { useForm } from "react-hook-form";
import { fetchLawyerInfo } from "../api/AdminApi";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";

const regions = [
  "National Capital Region (NCR)",
  "Cordillera Administrative Region (CAR)",
  "Region I - Ilocos",
  "Region II - Cagayan Valley",
  "Region III - Central Luzon",
  "Region IV-A - CALABARZON",
  "Region IV-B - MIMAROPA",
  "Region V - Bicol",
  "Region VI - Western Visayas",
  "Region VII - Central Visayas",
  "Region VIII - Eastern Visayas",
  "Region IX - Zamboanga Peninsula",
  "Region X - Northern Mindanao",
  "Region XI - Davao",
  "Region XII - SOCCSKSARGEN",
  "Region XIII - Caraga",
  "Autonomous Region in Muslim Mindanao (ARMM)",
];

export default function EditModal(props) {
  const [showModal, setShowModal] = useState(true);
  const { register, handleSubmit } = useForm();
  const [lawyer, setLawyer] = useState([]);
  const [loading, setloading] = useState<boolean>(false);

  const fetchLawyer = async (id) => {
    setloading(true);
    try {
      const data = await fetchLawyerInfo(id);
      setLawyer(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const editLawyer = async (form) => {
    try {
      await editLawyerInfo(props.id, form); // Variable named 'data'
      props.refetch();
      setShowModal(true);
    } catch (error) {
      console.log(error.data);
      toast.error('Something went wrong')
    }
  };

  return (
    <>
    <ToastContainer />
      <button className="text-maroon hover:text-hover"
        onClick={(e) => {
          setShowModal(false);
          fetchLawyer(props.id);
        }}
      >
        Edit
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
              <div className="border-0 dark:bg-darkcard dark:text-white rounded-lg h-full shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start h-[8%] justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-sm font-semibold">Add Dealer</h3>
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

                <form onSubmit={handleSubmit(editLawyer)}>
                  <div className="relative p-4">
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        defaultValue={lawyer.name}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="username"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        {...register("username")}
                        defaultValue={lawyer.username}
                        type="text"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        defaultValue={lawyer.email}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Example@email.com"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="phone"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        {...register("phone_number")}
                        defaultValue={lawyer.phone_number}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="09*******"
                        required
                      />
                    </div>
                    <div className="grid gap-2 mb-2 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <input
                          {...register("address")}
                          defaultValue={lawyer.address}
                          type="text"
                          name="address"
                          id="address"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Address"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Region"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Region
                        </label>
                        <select
                          {...register("region")}
                          id="region"
                          name="region"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>{lawyer.region}</option>
                          {regions.map((region, index) => (
                            <option key={index} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        {...register("password")}
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                      />
                    </div>
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
                      type="submit"
                    >
                      Add Dealer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Show>
      </Show>
    </>
  );
}
