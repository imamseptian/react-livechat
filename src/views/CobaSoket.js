import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { socketURL } from "../variables/MyVar";
const CobaSoket = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(socketURL);
  }, []);

  return <div>sadsadsadsa</div>;
};

export default CobaSoket;
