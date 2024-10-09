import { useEffect, useState } from "react";
import "../styles/stars.css"; // CSS 파일

// JSX에서 별을 그리는 컴포넌트
function Stars() {
  const [starPositions, setStarPositions] = useState([]);

  useEffect(() => {
    // 브라우저 크기를 가져와 별의 위치 범위를 설정
    const width = window.innerWidth; // 브라우저 너비 기반 X축 범위
    const height = window.innerHeight; // 브라우저 높이 기반 Y축 범위
    const depth = 200; // Z축 범위는 고정

    const positions = new Array(20000).fill(0).map(() => ({
      position: [
        Math.random() * width - width / 2, // X 축 (브라우저 너비 기반)
        Math.random() * height - height / 2, // Y 축 (브라우저 높이 기반)
        Math.random() * depth - depth / 2, // Z 축
      ],
    }));

    setStarPositions(positions);
  }, []);

  return (
    <>
      {starPositions.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </>
  );
}

export default Stars;
