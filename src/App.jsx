import { Canvas } from "@react-three/fiber";
import Earthglobe from "./components/Earthglobe_texture";
import Stars from "./components/Stars";
import StatusPanel from "./components/StatusPanel";
import "./styles/canvas.css";
import "./styles/style.css";
import { cameraSettings } from "./data/cameraSettings.js";

export default function App() {
  return (
    <>
      <Canvas className="canvas-container" camera={cameraSettings}>
        <Earthglobe />
        <Stars />
      </Canvas>
      <StatusPanel className="status-panel" />
    </>
  );
}
