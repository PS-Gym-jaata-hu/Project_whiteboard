import React, { useRef } from "react";
import { Socket } from "socket.io-client";

export const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => sideBarRef.current.style.left = 0;
  const closeSideBar = () => sideBarRef.current.style.left = "-100%";

  return (
    <>
      <button
        className="btn btn-dark position-absolute top-0 start-0 m-3 shadow"
        onClick={openSideBar}
      >
        👥 Users
      </button>
      <div
        ref={sideBarRef}
        className="position-fixed top-0 h-100 bg-dark text-white shadow-lg px-3 pt-4"
        style={{ width: "200px", left: "-100%", transition: "0.3s" }}
      >
        <button className="btn btn-outline-light w-100 mb-3" onClick={closeSideBar}>Close</button>
        <h5 className="text-center border-bottom pb-2">Users</h5>
        <div className="pt-3">
          {users.map((usr, index) => (
            <div key={index} className="text-center py-1">
              {usr.username}
              {usr.id === socket.id && <span className="text-warning"> (You)</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Sidebar;
