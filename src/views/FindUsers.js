import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserItem } from "../components";
import { expressURL } from "../variables/MyVar";

const FindUsers = () => {
  const history = useHistory();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  const [keyword, setkeyword] = useState("");

  const [listUsers, setlistUsers] = useState([]);

  const logOut = () => {
    localStorage.removeItem("LOGIN_JWT");
    history.push("/login");
  };

  const getUsers = () => {
    let store = JSON.parse(localStorage.getItem("LOGIN_JWT"));
    if (store && store.login) {
      let config = {
        headers: {
          token: store.token,
        },
      };
      axios
        .get(`${expressURL}user/find?keyword=${keyword}`, config)
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
    getUsers();
  }, []);

  const ListUsers = () => {
    if (listUsers.length > 0) {
      return (
        <div>
          {listUsers.map((user, index) => {
            return <UserItem key={index} user={user} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="text-center font-bold text-lg mt-16">
          Cannot find the user.
        </div>
      );
    }
  };

  return (
    <div
      className="contenair bg-cover bg-fixed min-h-screen w-full flex flex-col"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100")',
      }}
    >
      <div className="container mx-auto flex flex-col h-screen shadow-lg w-full lg:w-3/4">
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
        <div className="flex justify-center bg-white bg-opacity-90">
          <div className="relative w-full lg:w-3/4  text-gray-600 ">
            <input
              type="search"
              name="serch"
              placeholder="Search"
              onChange={(e) => {
                setkeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  //   alert("a");
                  getUsers();
                }
              }}
              value={keyword}
              className="bg-white h-10 w-full px-5 pr-10 lg:rounded-full text-sm focus:outline-none "
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                getUsers();
              }}
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll flex-1 flex flex-row justify-between bg-white bg-opacity-90 ">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {/* <ListUsers /> */}
              {/* <UserItem user={listUsers[0]} /> */}
              <ListUsers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUsers;
