import "./App.css";
import { AnimatedBackground } from "./components/animated-background";
import ReactDOM from "react-dom";
import { Canvas } from '@react-three/fiber';
import Model from "./components/Model";


function App() {
  return (
    <div>
      <AnimatedBackground
        backgroundColor="#000000"
        colorFront="#0e1036"
        speed={0.3}
        shape="warp"
        type="4x4"
      >
        <div style={{ width: "100vw", height: "100vh" }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} >
            <Model />
          </Canvas>
        </div>
      </AnimatedBackground>
    </div>
  );
}

export default App;
