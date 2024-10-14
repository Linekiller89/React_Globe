import React, { useRef, useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { cities } from "../data/cities";
import { countries } from "../data/countries";
import { continents, oceans } from "/src/data/continents_Oceans.js";
import { orbitcontrolsettings } from "/src/data/orbitcontrol.js";
import { gsap } from "gsap";

function Earthglobe_texture() {
  const mesh = useRef();
  const controlsRef = useRef(); // OrbitControls를 참조하기 위한 useRef

  const dayTexture = useLoader(TextureLoader, "/8k_earth_day.jpg");

  // 위도와 경도를 3D 구 표면 좌표로 변환하는 함수
  const latLonToXYZ = (radius, lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  // 핀 클릭 시 지구본 회전 함수
  const handlePinClick = (targetPosition) => {
    if (mesh.current && controlsRef.current) {
      console.log("Target Position (Before):", targetPosition);

      // gsap을 사용하여 부드럽게 지구본 회전
      gsap.to(mesh.current.rotation, {
        x: Math.asin(targetPosition[1] / 1.02),
        y: -Math.atan2(targetPosition[0], targetPosition[2]),
        duration: 1.5,
        onUpdate: () => {
          controlsRef.current.update(); // 회전이 업데이트될 때마다 컨트롤 업데이트
        },
        onComplete: () => {
          console.log("Camera Position (After):", controlsRef.current.target);
        },
      });
      // 자동 회전 비활성화
      controlsRef.current.autoRotate = false;
    }
  };

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <mesh ref={mesh} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={dayTexture} />

        {[...cities, ...countries, ...continents, ...oceans].map(
          (location, index) => {
            const [x, y, z] = latLonToXYZ(1.02, location.lat, location.lon);
            return (
              <mesh
                key={index}
                position={[x, y, z]}
                onClick={() => handlePinClick([x, y, z])}
              >
                <sphereGeometry args={[0.01, 16, 16]} />
                <meshStandardMaterial color={location.color || "white"} />
              </mesh>
            );
          }
        )}
      </mesh>

      <OrbitControls
        ref={controlsRef}
        {...orbitcontrolsettings}
        enableDamping={true}
        dampingFactor={0.1}
      />
    </>
  );
}

export default Earthglobe_texture;
