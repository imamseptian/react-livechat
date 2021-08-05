import axios from "axios";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import bgImg from "../../images/bgLogin.jpg";
import { expressURL } from "../../variables/MyVar";

const Login = () => {
  const history = useHistory();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);

  const submitLogin = () => {
    seterrorMsg({
      email: "",
      password: "",
    });
    // alert("asu");
    setisLoading(true);
    axios
      .post(`${expressURL}user/login`, userData)
      .then((res) => {
        localStorage.setItem(
          "LOGIN_JWT",
          JSON.stringify({
            login: true,
            token: res.data.token,
            user: res.data.user,
          })
        );

        history.push("/");
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data);
        if (err.response.status === 400) {
          if (err.response.data.errorEmail) {
            seterrorMsg({ password: "", email: err.response.data.errorEmail });
          }
          if (err.response.data.errorPassword) {
            seterrorMsg({
              email: "",
              password: err.response.data.errorPassword,
            });
          }
        }
        setisLoading(false);
      });
  };

  const TextAlert = (props) => {
    return (
      <div>
        {props.text ? (
          <div className="text-red-500 text-xs font-bold mt-1">
            {/* *Username must be 8 characters or longer */}*{props.text}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style={{
        // backgroundImage:
        //   "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0" />
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-3  font-bold text-gray-900 text-xl lg:text-3xl">
            Simple Chat App
          </h2>
          <p className="mt-2 lg:text-md sm:text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form
          className="space-y-6"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              placeholder="Your Email"
              value={userData.email}
              onChange={(e) => {
                setuserData({ ...userData, email: e.target.value });
              }}
            />
            <TextAlert text={errorMsg.email} />
          </div>
          <div className="mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Your Password"
              value={userData.password}
              onChange={(e) => {
                setuserData({ ...userData, password: e.target.value });
              }}
            />
            <TextAlert text={errorMsg.password} />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center ${
                isLoading ? "bg-gray-400" : "bg-indigo-500"
              } text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline ${
                !isLoading ? "hover:bg-indigo-600" : null
              } shadow-lg cursor-pointer transition ease-in duration-300`}
            >
              Login
            </button>
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Don't have an account?</span>
            <NavLink
              exact
              activeClassName="text-warning"
              className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
              aria-current="page"
              to="/register"
            >
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
