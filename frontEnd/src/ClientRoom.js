import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    socket.on("message", (data) => toast.info(data.message));
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
    socket.on("canvasImage", (data) => {
      if (imgRef.current) imgRef.current.src = data;
    });
  }, []);

  return (
    <div className="container-fluid min-vh-100 py-5 px-3 d-flex flex-column align-items-center justify-content-center" style={{ background: "linear-gradient(to right, #1d4350, #a43931)" }}>
      <div className="rounded-4 shadow-lg bg-white p-4 text-center mb-4" style={{ width: "90%", maxWidth: "1000px" }}>
        <h2 className="text-dark">📺 Viewing Whiteboard — <span className="text-muted">Users Online: {userNo}</span></h2>
      </div>
      <div className="border rounded-4 shadow bg-white overflow-hidden" style={{ width: "90%", maxWidth: "1000px", height: "500px" }}>
        <img ref={imgRef} src="" alt="Live Canvas" className="w-100 h-100" />
      </div>
    </div>
  );
};

export default ClientRoom;
