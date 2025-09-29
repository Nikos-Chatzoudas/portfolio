import "./App.css";
import { AnimatedBackground } from "./components/animated-background";

function App() {
  return (
    <div>
      <AnimatedBackground
        backgroundColor="#121212"
        colorFront="#1a1d57"
        speed={0.3}
        shape="circle"
        type="4x4"
      ></AnimatedBackground>
    </div>
  );
}

export default App;
