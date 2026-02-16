'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Shared mouse state — single global ref, zero React overhead ─────────────
const MOUSE = { x: 0, y: 0 };

// ─── Particles using a BufferGeometry points object (cheapest possible) ──────
function Particles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
      speeds[i] = Math.random() * 0.3 + 0.08;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, []);

  // Store original positions separately
  const origin = useMemo(() => positions.slice(), [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const count = speeds.length;
    for (let i = 0; i < count; i++) {
      const s = speeds[i], o = offsets[i];
      pos[i * 3 + 0] = origin[i * 3 + 0] + Math.sin(t * s + o) * 0.5 + MOUSE.x * 0.6;
      pos[i * 3 + 1] = origin[i * 3 + 1] + Math.cos(t * s * 0.7 + o) * 0.3 + MOUSE.y * 0.4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffcc"
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}



// ─── Simple torus rings ───────────────────────────────────────────────────────
function TechRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.1 + MOUSE.x * 0.3;
    ref.current.rotation.x = MOUSE.y * 0.2;
  });

  const rings = [
    { r: 4.5, tube: 0.016, rot: [Math.PI / 3, 0, 0.2] as [number,number,number], color: '#00ffcc' },
    { r: 5.2, tube: 0.012, rot: [-Math.PI / 4, 0, -0.3] as [number,number,number], color: '#0088ff' },
    { r: 3.8, tube: 0.02,  rot: [Math.PI / 6, 0, 0.5] as [number,number,number], color: '#ff00aa' },
  ];

  return (
    <group ref={ref}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rot}>
          <torusGeometry args={[ring.r, ring.tube, 4, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Central orb — just geometry + basic materials, no shaders ───────────────
function CentralOrb() {
  const ref = useRef<THREE.Group>(null);
  const pos = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (!ref.current) return;
    pos.current.set(MOUSE.x * 0.5, MOUSE.y * 0.4, 0);
    ref.current.position.lerp(pos.current, 0.05);
    ref.current.rotation.y = clock.elapsedTime * 0.2;
    ref.current.rotation.x = clock.elapsedTime * 0.07;
  });

  return (
    <group ref={ref}>
      {/* Solid core */}
      <mesh>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial color="#003355" transparent opacity={0.9} />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial color="#00ffcc" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.025, 4, 48]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.5} />
      </mesh>
      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 4, 0.3, 0]}>
        <torusGeometry args={[2.1, 0.015, 4, 48]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// ─── Skill labels rendered as HTML over canvas (avoids Text SDF shader) ──────
// (Handled in page.tsx overlay — see SkillOverlay)

// ─── Background shapes ────────────────────────────────────────────────────────
function BackgroundShapes() {
  const ref = useRef<THREE.Group>(null);

  const shapes = useMemo(() => [
    { p: [-8,  3, -9] as [number,number,number], s: 0.42, c: '#ff00aa', t: 0 },
    { p: [ 8, -2, -7] as [number,number,number], s: 0.38, c: '#00ccff', t: 1 },
    { p: [-7, -4, -8] as [number,number,number], s: 0.36, c: '#0055ff', t: 0 },
    { p: [ 7,  4,-10] as [number,number,number], s: 0.44, c: '#ffaa00', t: 1 },
    { p: [-9,  0,-11] as [number,number,number], s: 0.32, c: '#aa00ff', t: 0 },
    { p: [ 0, -6, -7] as [number,number,number], s: 0.4,  c: '#ff4400', t: 1 },
  ], []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const sp = shapes[i].s * 0.7;
      child.rotation.x = t * sp;
      child.rotation.y = t * sp * 1.3;
    });
    ref.current.rotation.y += (MOUSE.x * 0.05 - ref.current.rotation.y) * 0.02;
    ref.current.rotation.x += (MOUSE.y * 0.03 - ref.current.rotation.x) * 0.02;
  });

  return (
    <group ref={ref}>
      {shapes.map((g, i) => (
        <mesh key={i} position={g.p}>
          {g.t === 0
            ? <icosahedronGeometry args={[g.s, 0]} />
            : <octahedronGeometry args={[g.s * 1.1, 0]} />
          }
          <meshBasicMaterial color={g.c} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
function Grid() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = MOUSE.x * 0.3;
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 20, '#001a33', '#001a33']}
      position={[0, -6, -4]}
    />
  );
}

// ─── Camera ───────────────────────────────────────────────────────────────────
function Camera() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smooth.current.x += (MOUSE.x * 1.5 - smooth.current.x) * 0.03;
    smooth.current.y += (MOUSE.y * 1.0 - smooth.current.y) * 0.03;
    camera.position.x = smooth.current.x;
    camera.position.y = smooth.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Star field via a single Points object ────────────────────────────────────
function StarField() {
  const geo = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 30 + Math.random() * 20;
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geo, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#aaccff" size={0.12} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Scene() {
  const [dpr, setDpr] = useState(1);

  // Set DPR safely on client only
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
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={dpr}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{
        antialias: false,          // OFF — biggest single GPU saving
        alpha: false,
        stencil: false,            // Not needed
        depth: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000814');
        const canvas = gl.domElement;
        const onLost = (e: Event) => { e.preventDefault(); };
        const onRestored = () => { /* renderer auto-restores */ };
        canvas.addEventListener('webglcontextlost', onLost);
        canvas.addEventListener('webglcontextrestored', onRestored);
      }}
    >
      <color attach="background" args={['#000814']} />
      <fog attach="fog" args={['#000814', 20, 40]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 6]} intensity={1.2} color="#00ffcc" />
      <pointLight position={[-6, 4, 2]} intensity={0.7} color="#0066ff" />

      <Camera />
      <StarField />
      <Grid />
      <CentralOrb />
      <TechRings />
      <Particles />
      <BackgroundShapes />
    </Canvas>
  );
}