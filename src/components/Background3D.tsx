"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const createRandomCubes = () => {
  return Array.from({ length: 10 }).map(() => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ),
    size: Math.random() * 0.5 + 0.1,
  }));
};

function Cube({ position, size }: { position: THREE.Vector3; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={"#a855f7"} wireframe />
    </mesh>
  );
}

export default function Background3D() {
  const cubes = useMemo(() => createRandomCubes(), []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={1} />
        {cubes.map((cube, i) => (
          <Cube key={i} position={cube.position} size={cube.size} />
        ))}
      </Canvas>
    </div>
  );
}
