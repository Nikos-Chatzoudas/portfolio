import { Html, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

export default function Model() {
  const model = useGLTF('mainmodel.glb');
  const screen = model.scene.getObjectByName('Screen');

  const { width, height, scale } = useControls('iframe', {
    width: {
      value: 1024,
      min: 100,
      max: 2000,
      step: 1
    },
    height: {
      value: 600,
      min: 100,
      max: 1200,
      step: 1
    },
    scale: {
      value: 1,
      min: 0.1,
      max: 2,
      step: 0.1
    }
  });

  return (
    <>
      <Environment preset="city" />
      <primitive object={model.scene} />
      {screen && (
        <Html
          transform
          occlude
          wrapperClass="model-fullscreen"
          distanceFactor={scale}
          position={[
            screen.position.x,
            screen.position.y,
            screen.position.z + 0.001,
          ]}
        >
          <iframe
            src="https://os.chatzoudas.dev"
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          />
        </Html>
      )}
      <OrbitControls enablePan enableZoom enableRotate />
    </>
  );
}
