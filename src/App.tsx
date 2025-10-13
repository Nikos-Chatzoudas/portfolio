import "./App.css";
import { AnimatedBackground } from "./components/animated-background";

import { Canvas } from '@react-three/fiber';
import Model from "./components/Model";

import Controller from "./components/controller";
import { useCallback, useState } from "react";


function App() {
  const [resetCamera, setResetCamera] = useState<(() => void)>(() => () => { });

  const handleCameraReset = useCallback((handler: () => void) => {
    setResetCamera(() => handler);
  }, []);
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
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} >
            <Model onCameraReset={handleCameraReset} />
          </Canvas>

        </div>
        <Controller onReset={resetCamera} />
      </AnimatedBackground>
    </div>
  );
}

export default App;
