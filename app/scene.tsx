'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Trail, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Shared mouse state — single global ref, zero React overhead ─────────────
const MOUSE = { x: 0, y: 0 };

// ─── Data Core (The Sun) ─────────────────────────────────────────────────────
function DataCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef1 = useRef<THREE.Mesh>(null);
  const shellRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.x = t * 0.1;
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
    if (shellRef1.current) {
      shellRef1.current.rotation.y = -t * 0.15;
      shellRef1.current.rotation.x = t * 0.1;
    }
    if (shellRef2.current) {
      shellRef2.current.rotation.y = t * 0.1;
      shellRef2.current.rotation.z = -t * 0.05;
    }
  });

  return (
    <group>
      {/* Dense Glowing Inner Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshBasicMaterial 
          color="#00ffcc" 
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Solid Inner Core for solidness */}
      <mesh>
        <icosahedronGeometry args={[1.15, 3]} />
        <meshBasicMaterial 
          color="#001122" 
        />
      </mesh>

      {/* Layer 1 Shell */}
      <mesh ref={shellRef1} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#0088ff" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Layer 2 Shell */}
      <mesh ref={shellRef2} scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial 
          color="#a78bfa" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </group>
  );
}

// ─── Orbital Data Rings ───────────────────────────────────────────────────────
function OrbitalRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.elapsedTime * 0.2) * 0.1;
      ringsRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={ringsRef}>
      {/* Outer Ring */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} />
      </mesh>
      
      {/* Inner Ring */}
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.6} />
      </mesh>

      {/* Accent Ring */}
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[6.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ─── Orbiting Planets with Trails ─────────────────────────────────────────────
function OrbitingNode({ 
  radius, speed, color, size, offset, floatSpeed 
}: { 
  radius: number, speed: number, color: string, size: number, offset: number, floatSpeed: number 
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime * speed + offset;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={floatSpeed} rotationIntensity={2} floatIntensity={2}>
        <Trail width={1.5} length={6} color={color} attenuation={(t) => t * t}>
          <mesh>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </Trail>
      </Float>
    </group>
  );
}

function PlanetarySystem() {
  const systemRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (systemRef.current) {
      // Tilt the entire system based on mouse
      systemRef.current.rotation.x = THREE.MathUtils.lerp(systemRef.current.rotation.x, MOUSE.y * 0.3, 0.05);
      systemRef.current.rotation.y = THREE.MathUtils.lerp(systemRef.current.rotation.y, MOUSE.x * 0.3, 0.05);
      systemRef.current.position.x = THREE.MathUtils.lerp(systemRef.current.position.x, MOUSE.x * -1, 0.05);
      systemRef.current.position.y = THREE.MathUtils.lerp(systemRef.current.position.y, MOUSE.y * -1, 0.05);
    }
  });

  return (
    <group ref={systemRef}>
      <DataCore />
      <OrbitalRings />
      
      <OrbitingNode radius={3.5} speed={0.4} color="#00ffcc" size={0.15} offset={0} floatSpeed={2} />
      <OrbitingNode radius={5} speed={0.25} color="#a78bfa" size={0.2} offset={Math.PI} floatSpeed={1.5} />
      <OrbitingNode radius={6.5} speed={0.15} color="#0088ff" size={0.1} offset={Math.PI / 2} floatSpeed={3} />
      <OrbitingNode radius={4.2} speed={0.35} color="#f97316" size={0.08} offset={Math.PI * 1.5} floatSpeed={2.5} />
    </group>
  );
}

// ─── Camera Parallax ──────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, MOUSE.x * 2, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, MOUSE.y * 1.5, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Root Scene ───────────────────────────────────────────────────────────────
export default function Scene() {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio ?? 1, 1.5));

    const onMouseMove = (e: MouseEvent) => {
      MOUSE.x = (e.clientX / window.innerWidth) * 2 - 1;
      MOUSE.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={dpr}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
      }}
    >
      <color attach="background" args={['#00050d']} />
      
      <CameraRig />
      
      {/* Main Elements */}
      <PlanetarySystem />

      {/* Environment Dust / Stars */}
      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={20} size={2} speed={0.4} color="#00ffcc" opacity={0.2} />

      {/* Cinematic Post-Processing */}
      <EffectComposer multisampling={0}>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={1.2} 
          mipmapBlur 
        />
      </EffectComposer>
    </Canvas>
  );
}