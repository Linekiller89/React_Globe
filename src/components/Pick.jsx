// Pick.jsx
import React from "react";
import { useRef } from "react";

function Pick({ targetPosition, color, onPick }) {
  const meshRef = useRef();

  // 클릭 이벤트 처리 함수
  const handlePick = (event) => {
    event.stopPropagation();
    if (meshRef.current) {
      onPick(meshRef.current);
    }
  };

  return (
    <mesh ref={meshRef} position={targetPosition} onClick={handlePick}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default Pick;
