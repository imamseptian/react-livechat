import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserItem } from "../components";
import { io } from "socket.io-client";
import { expressURL } from "../variables/MyVar";
const Homepage = () => {
  const history = useHistory();
  const socket = useRef();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  const [listUsers, setlistUsers] = useState([]);

  const logOut = () => {
    localStorage.removeItem("LOGIN_JWT");
    history.push("/login");
  };

  const getHome = () => {
    let store = JSON.parse(localStorage.getItem("LOGIN_JWT"));
    if (store && store.login) {
      let config = {
        headers: {
          token: store.token,
        },
      };
      axios
        .get(`${expressURL}user/homepage`, config)
        .then((res) => {
          setuserData(res.data.currentuser);
          setlistUsers(res.data.users);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8000", {
      transports: ["websocket"],
      query: {
        userId: JSON.parse(localStorage.getItem("LOGIN_JWT")).user._id,
      },
    });
    getHome();
    return () => {
      socket.current.close();
    };
  }, []);

  // const ListUsers = () => {
  //   if (listUsers.length > 0) {
  //     return (
  //       <div>
  //         {listUsers.map((user, index) => {
  //           return <UserItem key={index} user={user} />;
  //         })}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="text-center font-bold text-lg mt-16">
  //         You never started a conversation before, please start chat with
  //         someone :)
  //       </div>
  //     );
  //   }
  // };

  const ListUsers = () => {
    return (
      <div>
        {listUsers.map((user, index) => {
          return <UserItem key={index} user={user} />;
        })}
      </div>
    );
  };

  const ButtonSearch = () => {
    return (
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          history.push("/find");
        }}
        className="flex absolute bottom-2 right-0  bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
      >
        Find more users
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline ml-2 w-6 stroke-current text-white stroke-2"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    );
  };

  return (
    <div
      className="contenair bg-cover bg-fixed min-h-screen w-full flex flex-col"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100")',
      }}
    >
      <div className="container mx-auto flex flex-col h-screen shadow-lg w-full lg:w-3/4 relative">
        <ButtonSearch />
        {/* headaer */}
        <div className="px-5  flex justify-between items-center bg-white bg-opacity-90 border-b-2 rounded-t-xl">
          <div
            onClick={() => {
              history.push("/");
            }}
            className="text-sm lg:text-lg font-bold cursor-pointer "
          >
            ChatApp
          </div>

          <div className="flex flex-col items-center w-1/2 py-2">
            {/* <div className="h-12 w-12 px-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              RA
            </div> */}
            <img
              src={
                userData.avatar === ""
                  ? `${expressURL}uploads/default.png`
                  : `${expressURL}uploads/${userData.avatar}`
              }
              alt=""
              className="h-12 w-12 rounded-full "
            />
            <div className="text-xs lg:text-md font-bold">
              {userData.username}
            </div>
          </div>

          <div
            onClick={() => {
              logOut();
            }}
            className="text-sm lg:text-lg font-bold cursor-pointer "
          >
            Logout
          </div>
        </div>
        {/* end header */}
        <div className="bg-white bg-opacity-90 text-center text-lg text-black font-bold">
          Recent Chat
        </div>

        <div className="overflow-y-scroll flex-1 flex flex-row justify-between bg-white bg-opacity-90 ">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {/* <ListUsers /> */}
              {/* <UserItem user={listUsers[0]} /> */}
              {/* <ListUsers /> */}

              {listUsers.length > 0 ? (
                <ListUsers />
              ) : (
                <div className="text-center font-bold text-lg mt-16">
                  You never started a conversation before, please start chat
                  with someone :)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
