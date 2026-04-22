"use client";

import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  ContactShadows,
  MeshDistortMaterial
} from "@react-three/drei";
import { Suspense } from "react";

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Environment preset="studio" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshDistortMaterial 
            color="#oklch(75% 0.2 45)" 
            speed={2} 
            distort={0.3} 
            radius={1}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4.5} 
      />
    </>
  );
}

export default function ProductCanvas() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
