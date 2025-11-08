import "./App.css";
import { AnimatedBackground } from "./components/animated-background";

import { Canvas } from '@react-three/fiber';
import Model from "./components/Model";

import Controller from "./components/controller";
import { useCallback, useEffect, useRef, useState } from "react";

import Loader from "./components/loader"; // new

function App() {
  const [resetCamera, setResetCamera] = useState<(() => void)>(() => () => { });

  const handleCameraReset = useCallback((handler: () => void) => {
    setResetCamera(() => handler);
  }, []);

  // raw progress states
  const [modelProgress, setModelProgress] = useState<number>(0); // 0-100 from useProgress
  const [iframeMounted, setIframeMounted] = useState<boolean>(false); // iframe element mounted
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false); // iframe onLoad fired

  // simulated iframe progress (0-100)
  const [iframeProgress, setIframeProgress] = useState<number>(0);

  // start the simulated iframe progress when iframe is mounted
  useEffect(() => {
    if (!iframeMounted || iframeLoaded) return;

    // make sure it starts at a reasonable baseline
    setIframeProgress(prev => Math.max(prev, 10));

    const interval = setInterval(() => {
      setIframeProgress(prev => {
        // small random increments to feel natural, cap near 95
        const next = Math.min(95, prev + Math.random() * 6 + 2);
        return Math.round(next);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [iframeMounted, iframeLoaded]);

  // when iframe actually loads, jump to 100
  useEffect(() => {
    if (iframeLoaded) {
      setIframeProgress(100);
    }
  }, [iframeLoaded]);

  // weighted combined target (adjust weights if you prefer)
  const targetCombined = Math.round(modelProgress * 0.8 + iframeProgress * 0.2);

  // displayed progress with smoothing (lerp) to avoid big jumps
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<number>(targetCombined);
  targetRef.current = targetCombined;

  useEffect(() => {
    const tick = () => {
      setDisplayProgress(prev => {
        const target = targetRef.current;
        if (prev === target) return prev;

        const diff = target - prev;
        // snap when very close to avoid getting stuck at 99
        if (Math.abs(diff) < 0.5) {
          return target;
        }

        const next = prev + diff * 0.18; // easing factor (increase to be snappier)
        return Math.round(next);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    // start RAF loop
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // stop RAF when we reached 100 to ensure loader is removed
  useEffect(() => {
    if (displayProgress >= 100 && rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setDisplayProgress(100);
    }
  }, [displayProgress]);

  const allDone = modelProgress >= 100 && iframeLoaded;
  const showLoader = !allDone;

  // Add this useEffect to handle iframe display
  useEffect(() => {
    if (!showLoader) {
      const iframe = document.querySelector('iframe.nodisplay');
      if (iframe) {
        iframe.classList.remove('nodisplay');
      }
    }
  }, [showLoader]);

  return (
    <div>
      <AnimatedBackground
        backgroundColor="#000000"
        colorFront="#0e1036"
        speed={0.3}
        shape="warp"
        type="4x4"
      >
        {/* Loader overlay */}
        {showLoader && <Loader progress={displayProgress} />}

        <div style={{ width: "100vw", height: "100vh" }}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} >
            <Model
              onCameraReset={handleCameraReset}
              onProgress={(p) => setModelProgress(p)}
              onIframeMounted={() => setIframeMounted(true)}
              onIframeLoaded={() => setIframeLoaded(true)}
            />
          </Canvas>

        </div>
        <Controller onReset={resetCamera} />
      </AnimatedBackground>
    </div>
  );
}

export default App;
