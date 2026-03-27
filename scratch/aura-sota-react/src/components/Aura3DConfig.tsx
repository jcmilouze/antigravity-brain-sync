import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PresentationControls, 
  PerspectiveCamera,
  Environment
} from "@react-three/drei";
import * as THREE from "three";

const CoreModel = ({ material }: { material: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Material selection logic for premium textures
  const materialProps = useMemo(() => {
    switch (material) {
      case "onyx":
        return { 
          color: "#0a0a0a", 
          roughness: 0.1, 
          metalness: 0.9, 
          emissive: "#000000",
          ior: 2.5,
          reflectivity: 1
        } as const;
      case "gold":
        return { 
          color: "#D4AF37", 
          roughness: 0.15, 
          metalness: 1, 
          emissive: "#332200",
          ior: 2.2,
          reflectivity: 1 
        } as const;
      case "titanium":
        return { 
          color: "#888888", 
          roughness: 0.3, 
          metalness: 1, 
          emissive: "#111111",
          ior: 2.4,
          reflectivity: 0.8 
        } as const;
      default:
        return { color: "#ffffff", roughness: 0.5, metalness: 0.5 } as const;
    }
  }, [material]);

  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.4, 256, 64]} />
        <meshPhysicalMaterial 
            {...materialProps} 
            thickness={2}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Decorative inner rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color={materialProps.color} metalness={1} roughness={0} />
      </mesh>
    </Float>
  );
};

const Aura3DConfig = ({ currentMaterial }: { currentMaterial: string }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <PresentationControls
          global
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <CoreModel material={currentMaterial} />
        </PresentationControls>
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.5} />
        </mesh>
      </Canvas>
    </div>
  );
};

export { Aura3DConfig };
