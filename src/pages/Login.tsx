import Break from "../components/Break";
import Google from "../components/Google";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactLoading from "react-loading";
import logo from "../assets/logo.png";
import Show from "../components/other/Show";
import { login } from "../api/AuthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handlelogin = async (Formdata) => {
    setLoading(true);
    console.log(Formdata);
    try {
      const data = await login(Formdata);
      console.log("Login successful:", data);
      sessionStorage.setItem("token", data.token);
      navigate(data.access);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <>
      <div className="h-full w-full flex-col">
        <div className="flex justify-center absolute mt-9 w-full px-6 sm:absolute md:block md:mt-0 md:top-[22px] md:left-0 md:px-6 lg:px-8">
          <img src={logo} alt="logo" />
        </div>
        <ToastContainer />
        <Show
          loading={loading}
          fallback={
            <div className="h-full flex flex-col items-center justify-center">
              <ReactLoading
                type="bubbles"
                color="#6A0A2D"
                height={100}
                width={100}
              />
            </div>
          }
        >
          <form
            onSubmit={handleSubmit(handlelogin)}
            className="h-full flex flex-col items-center justify-center"
          >
            <h1 className="mb-7 font-bold text-[30px] text-black md:text-[40px]">
              Welcome Back !
            </h1>

            <input
              {...register("email")}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-lg relative block md:w-[25%] mb-5 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="EMAIL"
            />
            <input
              {...register("password")}
              type="password"
              required
              className="rounded-lg relative block md:w-[25%] mb-10 px-3 py-2 border-2 border-maroon placeholder-black"
              placeholder="PASSWORD"
            />
            <input
              type="submit"
              value={"Login"}
              className="bg-maroon w-52 h-11 text-white flex font-extrabold items-center justify-center rounded-lg hover:shadow-xl hover:border-black hover:border-2"
              style={{ color: "white" }}
            />

            {/* <button className="bg-maroon text-white w-52" type="button">LOGIN</button> */}
            <Break />
            <Google>Login</Google>
          </form>
        </Show>
      </div>
    </>
  );
}
