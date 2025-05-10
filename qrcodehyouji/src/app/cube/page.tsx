"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, Suspense } from "react";
import { TextureLoader, Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import cubeImages from "../exhibition.data";

const ROTATE_SPEED = 0.01;

function Cube({ images }: { images: string[] }) {
  const mesh = useRef<Mesh>(null);
  const textures = useLoader(TextureLoader, images);

  // 初期角度を斜めに設定
  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.PI / 6;
      mesh.current.rotation.y = Math.PI / 4;
    }
  }, []);

  // 常に回転し続ける
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += ROTATE_SPEED;
      mesh.current.rotation.x += ROTATE_SPEED * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={mesh} scale={[1, 1, 1]}>
        <boxGeometry args={[2, 2, 2]} />
        {textures.map((tex, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            map={tex}
            transparent={true}
            metalness={1}
            roughness={0.5}
          />
        ))}
      </mesh>
      <mesh position={[0, 2.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.2, 2.8, 32]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <coneGeometry args={[1.2, 2.8, 32]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function CubePage() {
  // const [zoomed, setZoomed] = useState(false);
  // const [currentIdx, setCurrentIdx] = useState(0);

  // const handleZoom = () => setZoomed(true);
  // const images = useMemo(() => {
  //   const arr = [...cubeImages];
  //   arr[STOP_FACE_INDEX] = cubeImages[STOP_FACE_INDEX];
  //   return arr;
  // }, []);
  //
  // 拡大・停止ロジックはコメントアウト

  return (
    <div className="h-screen w-full flex items-center justify-center" style={{background: "#000"}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} shadows style={{background: "#000"}}>
          <ambientLight intensity={1.5} color={0xffffff} />
          <directionalLight position={[4, 8, 6]} intensity={2.5} />
          <directionalLight position={[4, -8, 6]} intensity={1.5} />
          <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.7} />
          <Cube images={cubeImages} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
} 