'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MOUSE = { x: 0, y: 0 };

// ─── Slow ambient particles for contact room ─────────────────────────────────
function RoomParticles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, []);
  const origin = useMemo(() => geo.slice(), [geo]);
  const speeds = useMemo(() => Float32Array.from({ length: 60 }, () => Math.random() * 0.15 + 0.04), []);
  const offs   = useMemo(() => Float32Array.from({ length: 60 }, () => Math.random() * Math.PI * 2), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < 60; i++) {
      arr[i * 3]     = origin[i * 3]     + Math.sin(t * speeds[i] + offs[i]) * 0.3;
      arr[i * 3 + 1] = origin[i * 3 + 1] + Math.cos(t * speeds[i] * 0.8 + offs[i]) * 0.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geo, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#004488" size={0.06} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// ─── Floating ring decoration ─────────────────────────────────────────────────
function FloatingRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.06 + MOUSE.x * 0.12;
    ref.current.rotation.x = MOUSE.y * 0.08;
  });
  return (
    <group ref={ref} position={[0, 0, -6]}>
      <mesh rotation={[Math.PI / 5, 0, 0.3]}>
        <torusGeometry args={[6, 0.012, 4, 60]} />
        <meshBasicMaterial color="#003355" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0.2, -0.2]}>
        <torusGeometry args={[7.5, 0.008, 4, 60]} />
        <meshBasicMaterial color="#002244" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  const [dpr, setDpr] = useState(1);
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio ?? 1, 1.5));
    const h = (e: MouseEvent) => {
      MOUSE.x = (e.clientX / window.innerWidth) * 2 - 1;
      MOUSE.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={dpr}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#00060f');
        gl.domElement.addEventListener('webglcontextlost', e => e.preventDefault());
      }}
    >
      <color attach="background" args={['#00060f']} />
      <fog attach="fog" args={['#00060f', 12, 30]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 4]} intensity={1} color="#0066ff" />
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#00ffcc" />
      <RoomParticles />
      <FloatingRings />
    </Canvas>
  );
}