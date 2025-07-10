import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ background: "linear-gradient(to right, #1e3c72, #2a5298)" }}>
      <h1 className="text-white mb-5 text-center" style={{ fontWeight: "bold", fontSize: "2.8rem" }}>
        🖥️ Collaborate Live on the Whiteboard
      </h1>
      <div className="row w-100 justify-content-center" style={{ maxWidth: "1100px" }}>
        <div className="col-md-5 m-3 p-5 bg-white rounded-4 shadow-lg border border-2 border-primary card-hover">
          <h3 className="text-center text-primary fw-bold mb-4">Create a Room</h3>
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Your Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control bg-light"
                value={roomId}
                readOnly
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setRoomId(uuid())}
              >
                Regenerate
              </button>
              <CopyToClipboard
                text={roomId}
                onCopy={() => toast.success("Room ID copied!")}
              >
                <button type="button" className="btn btn-outline-dark">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              🚀 Create Room
            </button>
          </form>
        </div>

        <div className="col-md-5 m-3 p-5 bg-white rounded-4 shadow-lg border border-2 border-success card-hover">
          <h3 className="text-center text-success fw-bold mb-4">Join a Room</h3>
          <form onSubmit={handleJoinSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Your Name"
                className="form-control"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Room ID"
                className="form-control"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              ✅ Join Room
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .card-hover {
          transition: all 0.3s ease-in-out;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border-color: #ffc107 !important;
        }
      `}</style>
    </div>
  );
};

export default JoinCreateRoom;
