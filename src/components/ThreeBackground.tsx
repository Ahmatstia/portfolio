// ThreeBackground.tsx - VERSI DIPERBAIKI
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Stars() {
  const ref = useRef<THREE.Points>(null);

  // Generate random star positions
  const [sphere] = useState(() => {
    const positions = new Float32Array(2000 * 3); // Kurangi jumlah bintang
    for (let i = 0; i < 2000 * 3; i += 3) {
      const radius = 2; // Perbesar radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15; // Perlahan
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#60a5fa" // Warna lebih terang
          size={0.02} // Size lebih besar
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8} // Tambah opacity
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      {" "}
      {/* Tambah opacity */}
      <Canvas
        camera={{ position: [0, 0, 2] }} // Camera lebih dekat
        style={{ background: "transparent" }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
