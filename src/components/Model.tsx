import { Html, Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo } from 'react';
import { Vector3, Mesh, MeshStandardMaterial } from 'three';
import gsap from 'gsap';

export default function Model({ onCameraReset }: { onCameraReset?: (resetFn: () => void) => void }) {
  const model = useGLTF('main.glb');
  const texture = useTexture('bake.png');
  const screen = model.scene.getObjectByName('Screen');
  const { camera } = useThree();

  useMemo(() => {
    model.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;

        if (mesh.geometry.attributes['BakedUV']) {
          mesh.geometry.setAttribute(
            'uv2',
            mesh.geometry.attributes['BakedUV']
          );

          mesh.material = new MeshStandardMaterial({
            map: texture,
          });
        }
      }
    });
  }, [model, texture]);

  const handleCameraReset = useCallback(() => {
    const close = camera.position.distanceTo(new Vector3(0, 0, 2)) < 0.01;

    if (close == true) {
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 6,
        duration: 1,
        ease: "power2.inOut"
      });
    } else {
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 2,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  }, [camera.position]);

  useEffect(() => {
    if (onCameraReset) {
      onCameraReset(handleCameraReset);
    }
  }, [onCameraReset, handleCameraReset]);

  const animateButtonPress = useCallback((keyName: string) => {
    const obj = model.scene.getObjectByName(keyName);

    if (obj && (obj as Mesh).isMesh) {
      const mesh = obj as Mesh;
      const originalY = mesh.position.y;

      // Press down
      gsap.to(mesh.position, {
        y: originalY - 0.01,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          // Release back up
          gsap.to(mesh.position, {
            y: originalY,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      });
    }
  }, [model.scene]);

  // Key press listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let keyName = `key_${e.key.toLowerCase()}`;
      if (keyName == "key_ ") {
        keyName = "key_space";
      }
      //console.log("Key pressed:", e.key, "Looking for:", keyName);
      animateButtonPress(keyName);


    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [animateButtonPress]);

  return (
    <>
      <Environment preset="city" />
      <primitive object={model.scene} />
      {screen && (
        <Html
          transform
          occlude
          wrapperClass="model-fullscreen"
          distanceFactor={0.5}
          position={[
            screen.position.x,
            screen.position.y,
            screen.position.z + 0.001,
          ]}
        >
          <iframe src="https://os.chatzoudas.dev" />
        </Html>
      )}
      <OrbitControls enablePan enableZoom enableRotate minDistance={2} />
    </>
  );
}