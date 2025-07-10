import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";

export const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    socket.on("message", (data) => toast.info(data.message));
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prev) => [...prev, elements.at(-1)]);
    setElements((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    setElements((prev) => [...prev, history.at(-1)]);
    setHistory((prev) => prev.slice(0, -1));
  };

  return (
    <div className="container-fluid min-vh-100 py-4 px-3" style={{ background: "linear-gradient(to right, #141e30, #243b55)" }}>
      <div className="rounded-4 shadow-lg bg-white p-4 mb-4">
        <h2 className="text-center text-dark fw-bold mb-3">
          🎨 Whiteboard Room — <span className="text-muted">Users Online: {userNo}</span>
        </h2>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-2 mb-2">
            <label className="form-label fw-bold text-secondary">Color:</label>
            <input type="color" className="form-control form-control-color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="col-md-5 mb-2">
            <label className="form-label fw-bold text-secondary">Tool:</label>
            <div className="btn-group w-100">
              {["pencil", "line", "rect"].map((t) => (
                <input
                  key={t}
                  type="button"
                  className={`btn btn-outline-dark ${tool === t ? "active" : ""}`}
                  value={t.charAt(0).toUpperCase() + t.slice(1)}
                  onClick={() => setTool(t)}
                />
              ))}
            </div>
          </div>
          <div className="col-md-3 mb-2 d-flex gap-2">
            <button className="btn btn-outline-warning w-50" onClick={undo} disabled={!elements.length}>Undo</button>
            <button className="btn btn-outline-warning w-50" onClick={redo} disabled={!history.length}>Redo</button>
          </div>
          <div className="col-md-2 mb-2">
            <button className="btn btn-outline-danger w-100" onClick={clearCanvas}>Clear</button>
          </div>
        </div>
      </div>
      <Canvas
        canvasRef={canvasRef}
        ctx={ctx}
        color={color}

        setElements={setElements}
        elements={elements}
        tool={tool}

        socket={socket}
      />
    </div>
  );
};
export default Room;
