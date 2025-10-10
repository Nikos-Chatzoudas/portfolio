import { Html, Environment, OrbitControls, useGLTF } from '@react-three/drei';


export default function Model() {
  const model = useGLTF('mainmodel.glb');
  const screen = model.scene.getObjectByName('Screen');


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
          <iframe
            src="https://os.chatzoudas.dev"

          />
        </Html>
      )}
      <OrbitControls enablePan enableZoom enableRotate />
    </>
  );
}
