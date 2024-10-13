// StatusPanel.jsx
import React, { useRef, useState } from "react";
import "../styles/statusPanel.css";

function StatusPanel({ status }) {
  const panelRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    panelRef.current.style.cursor = "grabbing";
    panelRef.current.style.transition = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    panelRef.current.style.cursor = "grab";
  };

  return (
    <div
      ref={panelRef}
      className="status-panel"
      style={{ top: position.y, left: position.x, cursor: "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h4>Status</h4>
      <p>{status}</p>
    </div>
  );
}

export default StatusPanel;
