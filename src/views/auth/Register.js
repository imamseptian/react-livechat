import axios from "axios";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import bgImg from "../../images/bgLogin.jpg";
import { expressURL } from "../../variables/MyVar";

const Register = () => {
  let history = useHistory();

  const [isUpload, setisUpload] = useState(false);
  const [thumbnail, setthumbnail] = useState(
    `${expressURL}uploads/default.png`
  );

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errorMsg, seterrorMsg] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const registerUser = () => {
    seterrorMsg({
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    let bodyFormData = new FormData();
    Object.keys(userData).forEach((key) => {
      bodyFormData.append(key, userData[key]);
      // console.log(userData[key]);
    });
    axios({
      method: "POST",
      url: `${expressURL}user/signup`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        history.replace("/login");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          let objError = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
          };
          err.response.data.errors.forEach((data) => {
            console.log(data.param);
            objError[data.param] = data.msg;
          });
          seterrorMsg(objError);
        }
      });

    // axios
    // .post(`${expressURL}user/signup`, userData)
    //   .then((res) => {
    //     // console.log(res);
    //     // history.push("/login");
    //     history.replace("/login");
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     // if (err.response) {
    //     //   console.log(err.response.data);
    //     //   console.log(err.response.status);
    //     //   console.log(err.response.headers);

    //     // }
    //     if (err.response.status === 400) {
    //       let objError = {
    //         username: "",
    //         email: "",
    //         password: "",
    //         password_confirmation: "",
    //       };
    //       err.response.data.errors.forEach((data) => {
    //         console.log(data.param);
    //         objError[data.param] = data.msg;
    //       });
    //       seterrorMsg(objError);
    //     }
    //   });
  };

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setthumbnail(URL.createObjectURL(uploaded));
    // setSaveImage(uploaded);
    setuserData({ ...userData, avatar: uploaded });
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
          <h2 className="mt-3 text=xl lg:text=3xl font-bold text-gray-900">
            Simple Chat App
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Fill in the form below to register
          </p>
        </div>

        <form
          className="space-y-6"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Username
            </label>
            <input
              className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={(e) => {
                setuserData({ ...userData, username: e.target.value });
              }}
            />
            <TextAlert text={errorMsg.username} />
          </div>
          <div className="mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              value={userData.password}
              onChange={(e) => {
                setuserData({ ...userData, password: e.target.value });
              }}
            />
            <TextAlert text={errorMsg.password} />
          </div>
          <div className="mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Password Confirmation
            </label>
            <input
              className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Password Confirmation"
              value={userData.password_confirmation}
              onChange={(e) => {
                setuserData({
                  ...userData,
                  password_confirmation: e.target.value,
                });
              }}
            />
            <TextAlert text={errorMsg.password_confirmation} />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Avatar
            </label>
            <img
              src={thumbnail}
              alt=""
              onClick={() => {
                alert("asu");
              }}
              className="avatar h-20 w-20 rounded-full border-4 border-opacity-40 object-cover hover:opacity-50 cursor-pointer"
            />
            <input
              className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="file"
              placeholder="No Image"
              onChange={handleUploadChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                          font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Register
            </button>
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Already have an account?</span>
            <NavLink
              exact
              activeClassName="text-warning"
              className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
              aria-current="page"
              to="/login"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
