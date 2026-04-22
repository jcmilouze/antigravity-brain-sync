'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ConfiguratorSceneProps {
  color: string;
}

function ConfigurableModel({ color }: ConfiguratorSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main shape changes color */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.8, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Accent elements */}
      <mesh position={[0.7, 0.3, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#c2c9bc" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[-0.7, 0.3, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#c2c9bc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wobble element */}
      <mesh position={[0, 1.3, 0]}>
        <Icosahedron args={[0.3, 4]} />
        <MeshWobbleMaterial color="#becbb1" speed={3} factor={0.5} />
      </mesh>
    </group>
  );
}

export function ConfiguratorScene({ color }: ConfiguratorSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      gl={{
        antialias: true,
        alpha: true,
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#becbb1" />
      <pointLight position={[-4, 2, -4]} intensity={0.6} color="#88957d" />

      <ConfigurableModel color={color} />
    </Canvas>
  );
}
