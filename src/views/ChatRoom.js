import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { socketURL, expressURL } from "../variables/MyVar";

const ChatRoom = () => {
  const history = useHistory();
  let { identifier } = useParams();
  const [contentMsg, setcontentMsg] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const socket = useRef();
  const messagesEndRef = useRef(null);

  const [userData, setuserData] = useState({
    _id: null,
    name: "",
  });

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [friendData, setfriendData] = useState({
    name: "",
    avatar: "",
  });

  const sendMessage = () => {
    if (contentMsg !== "") {
      socket.current.emit("sendMessage", {
        sender: userData._id,
        receiver: identifier,
        content: contentMsg,
        createdAt: Date.now(),
      });
      setChatLog([
        ...chatLog,
        {
          sender: userData._id,
          receiver: identifier,
          content: contentMsg,
          createdAt: Date.now(),
        },
      ]);
      setcontentMsg("");
    }
  };

  const getChat = () => {
    let store = JSON.parse(localStorage.getItem("LOGIN_JWT"));
    if (store && store.login) {
      let config = {
        headers: {
          token: store.token,
        },
      };
      setuserData(store.user);

      axios
        .get(`${expressURL}user/getchat?friendid=${identifier}`, config)
        .then((res) => {
          console.log(res.data);
          setfriendData(res.data.friendAcc);
          setChatLog(res.data.chatLog);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return "Login";
    } else {
      return "Not Login";
    }
  };

  const logOut = () => {
    localStorage.removeItem("LOGIN_JWT");
    history.push("/login");
  };

  useEffect(() => {
    // console.log("useeffect chat log");
    // scrollToBottom();
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  useEffect(() => {
    getChat();
    socket.current = io(socketURL, {
      transports: ["websocket"],
      query: {
        userId: JSON.parse(localStorage.getItem("LOGIN_JWT")).user._id,
      },
    });
    socket.current.on("clientMessage", (msg) => {
      console.log(msg);
      if (msg.sender === identifier.toString()) {
        console.log("update logs");
        setChatLog((chatLog) => [
          ...chatLog,
          {
            sender: msg.sender,
            receiver: msg.receiver,
            content: msg.content,
            createdAt: msg.createdAt,
          },
        ]);
        console.log("update logs");
      }

      // setChatLog((chatLog) => [
      //   ...chatLog,
      //   {
      //     sender: msg.sender,
      //     receiver: msg.receiver,
      //     content: msg.content,
      //   },
      // ]);
    });
    return () => {
      socket.current.close();
    };
  }, []);

  const OtherChat = ({ item }) => {
    let dateChat = new Date(item.createdAt);
    return (
      <div className="flex justify-start mb-4">
        <img
          src={
            friendData.avatar === ""
              ? `${expressURL}uploads/default.png`
              : `${expressURL}uploads/${friendData.avatar}`
          }
          className="object-cover h-6 w-6 lg:h-8 lg:w-8 rounded-full"
          alt=""
        />
        <div>
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-xs lg:text-sm">
            {item.content}
          </div>
          <div className="text-black font-semibold pl-3 text-xs">
            {`${dateChat.getHours()}:${dateChat.getMinutes()}`}
          </div>
        </div>
      </div>
    );
  };

  const SingleMe = ({ item }) => {
    let dateChat = new Date(item.createdAt);

    return (
      <div className="flex justify-end mb-4">
        <div>
          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-xs lg:text-sm">
            {item.content}
          </div>
          <div className="text-black font-semibold pr-3 text-right text-xs">
            {`${dateChat.getHours()}:${dateChat.getMinutes()}`}
          </div>
        </div>

        <img
          src={
            userData.avatar === ""
              ? `${expressURL}uploads/default.png`
              : `${expressURL}uploads/${userData.avatar}`
          }
          className="object-cover h-6 w-6 lg:h-8 lg:w-8 rounded-full"
          alt=""
        />
      </div>
    );
  };

  const MoreMe = () => (
    <div className="flex justify-end mb-4">
      <div>
        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
          repudiandae.
        </div>
        <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          reiciendis!
        </div>
      </div>
      <img
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
    </div>
  );

  const MyChatLog = () => {
    return (
      <div>
        {chatLog.map((item, index) => {
          if (item.sender === userData._id) {
            return <SingleMe key={index} item={item} />;
          } else {
            return <OtherChat key={index} item={item} />;
          }
        })}
      </div>
    );
  };

  const SendButton = () => {
    return (
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className=" flex bg-blue-500 rounded-lg font-bold text-white text-center px-4 transition duration-300 ease-in-out hover:bg-blue-600 ml-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline w-4 stroke-current text-white stroke-2"
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
                  : `${expressURL}uploads/${friendData.avatar}`
              }
              alt=""
              className="h-12 w-12 rounded-full "
            />
            <div className="text-xs lg:text-md font-bold">
              {friendData.username}
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

        {/* CHAT LIST  */}

        <div className="overflow-y-scroll flex-1 flex flex-row justify-between bg-white bg-opacity-90">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              <MyChatLog />
              {/* <SingleMe />

              <OtherChat />
              <OtherChat /> */}
              {/* {JSON.stringify(chatLog)} */}
              <div ref={messagesEndRef}></div>
            </div>
          </div>
        </div>

        {/* INPUT MESSAGES  */}
        {/* <div className="text-white text-xl">{chatLog.length}</div> */}
        <div className="bg-white bg-opacity-90 rounded-b-xl px-5 flex">
          {/* <div>{JSON.stringify(userData)}</div> */}
          <div className=" flex-1">
            <textarea
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
              onChange={(e) => {
                setcontentMsg(e.target.value);
              }}
              value={contentMsg}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
          </div>
          <SendButton />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
