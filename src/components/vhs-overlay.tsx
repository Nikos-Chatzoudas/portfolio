import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // fast rolling scanlines
    float scan = sin((uv.y * uResolution.y * 0.9) - uTime * 6.0);
    float scanline = smoothstep(0.55, 1.0, scan) * 0.10;

    // slow drifting tracking-noise band
    float roll = fract(uv.y + uTime * 0.06);
    float band = smoothstep(0.0, 0.02, roll) * smoothstep(0.08, 0.02, roll) * 0.08;

    // animated grain
    float grain = (random(uv * uResolution + uTime * 60.0) - 0.5) * 0.06;

    // vignette
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.75, 0.3, dist);

    // subtle flicker
    float flicker = 0.96 + 0.04 * sin(uTime * 18.0) + 0.015 * random(vec2(uTime, 0.0));

    float alpha = clamp((scanline + band + grain * 0.5 + (1.0 - vignette) * 0.3) * flicker, 0.0, 0.45);

    // shifting red/cyan chromatic tint
    vec3 tint = mix(vec3(1.0, 0.15, 0.35), vec3(0.15, 1.0, 1.0), sin(uTime * 0.4 + uv.x * 6.0) * 0.5 + 0.5);

    gl_FragColor = vec4(tint * 0.35, alpha);
  }
`;

export default function VhsOverlay({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(1, 1) },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            depthTest: false,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const resize = () => {
            const width = canvas.clientWidth || 1;
            const height = canvas.clientHeight || 1;
            renderer.setSize(width, height, false);
            uniforms.uResolution.value.set(width, height);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        resize();

        const clock = new THREE.Clock();
        let raf = 0;

        const tick = () => {
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf);
            resizeObserver.disconnect();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
}
