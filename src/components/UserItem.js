import React from "react";
import { useHistory } from "react-router-dom";
import { expressURL } from "../variables/MyVar";
const UserItem = ({ user }) => {
  const history = useHistory();

  let mydate = new Date(user.lastOnline);

  const stringDate = () => {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      month[mydate.getMonth()]
    }-${mydate.getDate()}-${mydate.getFullYear()}, ${mydate.getHours()}:${mydate.getMinutes()} o'clock`;
    // if()
  };

  return (
    <div
      onClick={() => {
        // alert(user._id);
        history.push("/chat/" + user._id);
      }}
      className="card-content-profil flex justify-between items-center mb-4 cursor-pointer hover:opacity-80"
    >
      <div className=" flex gap-x-2 items-center">
        <img
          className="avatar h-12 w-12 lg:h-16 lg:w-16 rounded-full border-4 border-opacity-40 object-cover"
          // src={userData.avatar}
          src={`${expressURL}uploads/${user.avatar}`}
          alt=""
        />
        <div className="card-name-user text-md">
          <h3 className="font-semibold text-md ">{user.username}</h3>
          {/* <h3>{user.email}</h3> */}
          <h4 className="text-xs lg:text-sm text-gray-500 font-semibold">
            Last online : {stringDate()}
          </h4>
        </div>
      </div>
      <div className="card-action ml-8 lg:ml-0">
        <button
          onClick={() => {
            // alert(user._id);
            history.push("/chat/" + user._id);
          }}
          className="flex items-center px-4 py-2 text-xs text-white bg-green-700 hover:bg-gray-600"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span className>Chat</span>
        </button>
      </div>
    </div>
  );
};

export default UserItem;
