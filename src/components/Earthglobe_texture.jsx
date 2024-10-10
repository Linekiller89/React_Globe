import React, { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { cities } from "../data/cities";
import { countries } from "../data/countries";
import { continents, oceans } from "/src/data/continents_Oceans.js";

function EarthProbe() {
  const mesh = useRef();

  const dayTexture = useLoader(TextureLoader, "/8k_earth_day.jpg");

  const orbitcontrolsettings = {
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    autoRotate: true,
    autoRotateSpeed: 0.5,
    minDistance: 3,
    maxDistance: 40,
  };

  // 위도와 경도를 3D 구 표면 좌표로 변환하는 함수
  const latLonToXYZ = (radius, lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <mesh ref={mesh} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={dayTexture} />
      </mesh>

      {cities.map((city, index) => {
        const [x, y, z] = latLonToXYZ(1.02, city.lat, city.lon);
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>
        );
      })}

      {countries.map((country, index) => {
        const [x, y, z] = latLonToXYZ(1.02, country.lat, country.lon);
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="grey" />
          </mesh>
        );
      })}

      {continents.map((continent, index) => {
        const [x, y, z] = latLonToXYZ(1.02, continent.lat, continent.lon);
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="purple" />
          </mesh>
        );
      })}

      {oceans.map((ocean, index) => {
        const [x, y, z] = latLonToXYZ(1.02, ocean.lat, ocean.lon);
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        );
      })}

      <OrbitControls {...orbitcontrolsettings} />
    </>
  );
}

export default EarthProbe;
