'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Icosahedron, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function PrinterModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Auto-rotate
      groupRef.current.rotation.y += 0.003;

      // Mouse tracking (subtle)
      groupRef.current.rotation.x = mouse.y * 0.2;
      groupRef.current.rotation.z = mouse.x * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - purple cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top platform - cyan */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[1, 1, 0.3, 32]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.3} />
      </mesh>

      {/* Nozzle - magenta glowing */}
      <mesh position={[0, 0.5, 0.8]}>
        <coneGeometry args={[0.2, 0.8, 16]} />
        <meshStandardMaterial color="#FF006E" emissive="#FF006E" emissiveIntensity={0.5} />
      </mesh>

      {/* Accent spheres */}
      <mesh position={[0.8, 0.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[-0.8, 0.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wobble element */}
      <mesh position={[0, 1.8, 0]}>
        <Icosahedron args={[0.4, 4]} />
        <MeshWobbleMaterial color="#00D4FF" speed={2} factor={0.6} />
      </mesh>
    </group>
  );
}

export function PrinterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <ambientLight intensity={0.5} />

      {/* Key light - cyan */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />

      {/* Fill light - purple */}
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#7C3AED" />

      <PrinterModel />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}
