import { useState } from "react";
import Break from "../components/Break";
import Google from "../components/Google";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import logo from "../assets/logo.png";
import { signup } from "../api/AuthApi";
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

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handlesignup = async (Formdata) => {
    setLoading(true);
    console.log(Formdata);
    try {
      const data = await signup(Formdata); // Variable named 'data'
      console.log("Login successful:", data);
      sessionStorage.setItem("token", data.token);
      toast.success("Successfully Created");
      navigate("/Login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.data);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex-1 h-full w-full flex-col">
        <div className="flex justify-center absolute mt-9 w-full px-6 sm:absolute md:block md:mt-0 md:top-[22px] md:left-0 md:px-6 lg:px-8">
          <img src={logo} alt="logo" />
        </div>
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <ReactLoading
              type="bubbles"
              color="#6A0A2D"
              height={100}
              width={100}
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handlesignup)}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="mb-7 font-bold text-[25px] text-black md:text-[50px] md:mt-9 mt-20">
              Create an Account
            </h1>
            <input
              {...register("name")}
              type="name"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Name"
            />
            <input
              {...register("username")}
              type="username"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Username"
            />
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Email"
            />
            <input
              {...register("phone_number")}
              type="phone_number"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Phone Number"
            />
            <input
              {...register("address")}
              type="text"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Address"
            />
            <select
              {...register("region")}
              id="small"
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-2 px-3 py-2 border-2 border-maroon placeholder-black"
            >
              <option selected>Region...</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <input
              {...register("password")}
              type="password"
              required
              className="rounded-lg w-72 h-9 relative block md:w-[25%] mb-6 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="Password"
            />
            <input
              type="submit"
              value={"Login"}
              className="bg-maroon rounded-xl text-white w-60 h-[50px]"
            />
            <Break />
            <Google>Signup</Google>
          </form>
        )}
      </div>
    </>
  );
}
