import { createContext, useRef, useState, useContext } from "react";
import { hostAddress } from "./Const";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  let socketRef = useRef(null);

  const connectSocket = (token) => {
    if (!token || socketRef.current) return;

    const socket = io(hostAddress, { auth: { token } });

    socket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected successfully...");
    });

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    //   setConnected(false);
    // });
    socket.on("connect_error", (err) => {
      console.error("Socket connection error ", err.message);
    });

    socketRef.current = socket;
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      console.log("Disconnecting socket...");
      socketRef.current.disconnect();
      socketRef.current = null;
      setConnected(false);
    }
  };

  const getSocket = () => socketRef.current;

  return (
    <SocketContext.Provider
      value={{
        connectSocket,
        disconnectSocket,
        getSocket,
        isConnected: connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
