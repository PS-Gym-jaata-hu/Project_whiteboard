import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";

import ClientRoom from "./ClientRoom";
import JoinCreateRoom from "./JoinCreateRoom";
import Room from "./Room";
import Sidebar from "./Sidebar";

import "./style.css";

// ✅ Use deployed backend
const SERVER_URL = "https://project-whiteboard-backend.onrender.com";

// ✅ Connection options for reliability
const connectionOptions = {
  forceNew: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket", "polling"], // 🛠️ fallback ensures reliability
};

// ✅ Create socket once on load
const socket = io(SERVER_URL, connectionOptions);

const App = () => {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  // ✅ Generate unique UUID for user session
  const uuid = () => {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  // ✅ Emit user joined only when ready
  useEffect(() => {
    if (roomJoined && user?.userName) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined, user]);

  return (
    <div className="home">
      <ToastContainer />
      {roomJoined ? (
        <>
          <Sidebar users={users} user={user} socket={socket} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </>
      ) : (
        <JoinCreateRoom
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
