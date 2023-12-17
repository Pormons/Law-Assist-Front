import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default class Landing extends Component {
  render() {
    return (
      <>
        <div className="h-full md:flex">
          <div
            id="left"
            className="hidden md:flex md:flex-col md:items-center md:justify-center md:w-7/12">
            <div className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
              <img src={logo} alt="logo" />
            </div>
            <div className="md:flex-col md:text-center">
                <h1 className="text-maroon text-[30px] font-extrabold">Legal Answers,</h1>
                <h1 className="text-[40px] font-semibold">Just chat away</h1>
            </div>

          </div>
          <div
            id="right"
            className="h-full flex flex-col items-center justify-center bg-maroon md:w-5/12"
          >
            <div className="mb-10">
              <h2 className="text-center text-white font-bold text-[40px] leading-[1.2] md:text-[32px] md:leading-8">
                Get Started
              </h2>
            </div>
            <div className="w-full h-11 max-w-[340px] grid gap-x-2 gap-y-3 md:max-w-[440px] md:grid-cols-2 md:gap-10">
                <Link to="/Login" className="bg-white h-11 text-maroon flex font-extrabold items-center justify-center rounded-lg hover:shadow-xl hover:border-black hover:border-2" style={{ color: 'maroon' }}>
                    LOGIN
                </Link>
                <Link to="/Signup" className="bg-white h-11 text-maroon flex font-extrabold items-center justify-center rounded-lg hover:shadow-xl hover:border-black hover:border-2" style={{ color: 'maroon' }}>
                    SIGNUP
                </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
