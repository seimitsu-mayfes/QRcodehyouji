"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, Suspense } from "react";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

const ROTATE_SPEED = 0.01;

function CubeNoImage() {
  const mesh = useRef<Mesh>(null);
  // 6面の色
  const colors = [
    "#ff5555", // 赤
    "#55ff55", // 緑
    "#5555ff", // 青
    "#ffff55", // 黄
    "#55ffff", // シアン
    "#ff55ff", // マゼンタ
  ];

  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.PI / 6;
      mesh.current.rotation.y = Math.PI / 4;
    }
  }, []);

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
        {colors.map((color, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            color={color}
            metalness={1}
            roughness={0.5}
          />
        ))}
      </mesh>
      {/* 下向き円錐（上側） */}
      <mesh position={[0, 2.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.2, 2.8, 32]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.4} />
      </mesh>
      {/* 上向き円錐（下側） */}
      <mesh position={[0, -2.2, 0]}>
        <coneGeometry args={[1.2, 2.8, 32]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function CubeNoImagePage() {
  return (
    <div className="h-screen w-full flex items-center justify-center" style={{background: "#000"}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} style={{background: "#000"}}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[4, 8, 6]} intensity={1.5} />
          <CubeNoImage />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
} 