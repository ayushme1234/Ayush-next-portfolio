'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Sparkles, useDetectGPU } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Optimized Ayush avatar.
 * Fewer geometries, lower poly counts, NO post-processing.
 * Still has: blink, breathing, cursor-following pupils, soft glow.
 */
function Avatar({ mouse }) {
  const group = useRef(null)
  const head = useRef(null)
  const body = useRef(null)
  const pupilL = useRef(null)
  const pupilR = useRef(null)
  const lidL = useRef(null)
  const lidR = useRef(null)
  const lensL = useRef(null)
  const lensR = useRef(null)

  const blinkNext = useRef(2 + Math.random() * 3)
  const blinkProg = useRef(0)
  const blinking = useRef(false)

  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8b888', roughness: 0.7 }),
    []
  )
  const hair = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.95 }),
    []
  )
  const frame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.4, metalness: 0.5 }),
    []
  )
  const lensM = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1a0e2e',
        emissive: '#a78bfa',
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.55,
        roughness: 0.1,
        metalness: 0.3,
      }),
    []
  )
  const eye = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#fafafa', roughness: 0.2 }),
    []
  )
  const iris = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3a2a1a', roughness: 0.4 }),
    []
  )
  const shirt = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1c1c1f', roughness: 0.85 }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (group.current) {
      group.current.position.y = Math.sin(t * 1.4) * 0.04 - 0.1
      group.current.rotation.y = Math.sin(t * 0.4) * 0.06
    }

    if (head.current && mouse.current) {
      const tx = mouse.current.x * 0.3
      const ty = -mouse.current.y * 0.2
      head.current.rotation.y += (tx - head.current.rotation.y) * 0.05
      head.current.rotation.x += (ty - head.current.rotation.x) * 0.05
    }

    if (body.current) {
      const breath = 1 + Math.sin(t * 1.2) * 0.012
      body.current.scale.set(breath, breath, breath)
    }

    if (mouse.current) {
      const px = mouse.current.x * 0.04
      const py = -mouse.current.y * 0.025
      if (pupilL.current) {
        pupilL.current.position.x = -0.025 + px
        pupilL.current.position.y = py
      }
      if (pupilR.current) {
        pupilR.current.position.x = 0.025 + px
        pupilR.current.position.y = py
      }
    }

    blinkNext.current -= delta
    if (blinkNext.current <= 0 && !blinking.current) {
      blinking.current = true
      blinkProg.current = 0
    }
    if (blinking.current) {
      blinkProg.current += delta * 8
      const phase = Math.min(blinkProg.current, 2)
      const closed = phase < 1 ? phase : 2 - phase
      if (lidL.current) lidL.current.scale.y = closed
      if (lidR.current) lidR.current.scale.y = closed
      if (phase >= 2) {
        blinking.current = false
        blinkNext.current = 2.5 + Math.random() * 3.5
        if (lidL.current) lidL.current.scale.y = 0
        if (lidR.current) lidR.current.scale.y = 0
      }
    }

    const sh = (Math.sin(t * 1.6) + 1) * 0.5
    if (lensL.current?.material) lensL.current.material.emissiveIntensity = 0.3 + sh * 0.5
    if (lensR.current?.material) lensR.current.material.emissiveIntensity = 0.3 + sh * 0.5
  })

  return (
    <group ref={group}>
      {/* BODY — torso + neck */}
      <group ref={body} position={[0, -1.4, 0]}>
        <mesh material={shirt}>
          <cylinderGeometry args={[0.85, 1.1, 1.3, 24]} />
        </mesh>
        <mesh material={skin} position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.28, 0.32, 0.4, 16]} />
        </mesh>
      </group>

      {/* HEAD */}
      <group ref={head}>
        {/* Skull */}
        <mesh material={skin}>
          <sphereGeometry args={[1, 32, 32]} />
        </mesh>
        {/* Jaw */}
        <mesh material={skin} position={[0, -0.4, 0.08]}>
          <sphereGeometry args={[0.85, 24, 24]} />
        </mesh>
        {/* Hair cap */}
        <mesh material={hair} position={[0, 0.45, -0.05]}>
          <sphereGeometry args={[1.02, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
        </mesh>
        {/* Hair front sweep */}
        <mesh
          material={hair}
          position={[-0.18, 0.62, 0.78]}
          rotation={[0.4, 0.3, 0]}
        >
          <sphereGeometry args={[0.42, 16, 16, 0, Math.PI, 0, Math.PI / 2]} />
        </mesh>
        {/* Ears */}
        <mesh material={skin} position={[-1.0, 0, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
        </mesh>
        <mesh material={skin} position={[1.0, 0, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
        </mesh>

        {/* EYES — left */}
        <group position={[-0.32, 0.15, 0.82]}>
          <mesh material={eye}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.08]} material={iris}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          <mesh ref={pupilL} position={[-0.025, 0, 0.11]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh ref={lidL} position={[0, 0.06, 0.05]} scale={[1, 0, 1]} material={skin}>
            <sphereGeometry args={[0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>

        {/* EYES — right */}
        <group position={[0.32, 0.15, 0.82]}>
          <mesh material={eye}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.08]} material={iris}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          <mesh ref={pupilR} position={[0.025, 0, 0.11]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh ref={lidR} position={[0, 0.06, 0.05]} scale={[1, 0, 1]} material={skin}>
            <sphereGeometry args={[0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>

        {/* EYEBROWS */}
        <mesh material={hair} position={[-0.32, 0.5, 0.88]} rotation={[0, 0, -0.06]}>
          <boxGeometry args={[0.22, 0.04, 0.05]} />
        </mesh>
        <mesh material={hair} position={[0.32, 0.5, 0.88]} rotation={[0, 0, 0.06]}>
          <boxGeometry args={[0.22, 0.04, 0.05]} />
        </mesh>

        {/* GLASSES — torus default orientation faces the camera, no rotation needed */}
        <mesh position={[-0.32, 0.18, 0.92]} material={frame}>
          <torusGeometry args={[0.22, 0.022, 12, 32]} />
        </mesh>
        <mesh position={[0.32, 0.18, 0.92]} material={frame}>
          <torusGeometry args={[0.22, 0.022, 12, 32]} />
        </mesh>
        {/* Lens fills */}
        <mesh ref={lensL} position={[-0.32, 0.18, 0.91]} material={lensM}>
          <circleGeometry args={[0.21, 24]} />
        </mesh>
        <mesh ref={lensR} position={[0.32, 0.18, 0.91]} material={lensM}>
          <circleGeometry args={[0.21, 24]} />
        </mesh>
        {/* Bridge + temples */}
        <mesh position={[0, 0.18, 0.92]} material={frame}>
          <boxGeometry args={[0.2, 0.022, 0.022]} />
        </mesh>
        <mesh position={[-0.66, 0.2, 0.45]} rotation={[0, -0.5, 0]} material={frame}>
          <boxGeometry args={[0.6, 0.018, 0.018]} />
        </mesh>
        <mesh position={[0.66, 0.2, 0.45]} rotation={[0, 0.5, 0]} material={frame}>
          <boxGeometry args={[0.6, 0.018, 0.018]} />
        </mesh>

        {/* NOSE */}
        <mesh material={skin} position={[0, -0.1, 0.96]}>
          <sphereGeometry args={[0.08, 12, 12]} />
        </mesh>

        {/* SMILE — half-torus rotated to curve downward */}
        <mesh
          position={[0, -0.4, 0.88]}
          rotation={[0, 0, Math.PI]}
          material={frame}
        >
          <torusGeometry args={[0.13, 0.018, 8, 16, Math.PI]} />
        </mesh>
      </group>

      {/* Subtle sparkle aura */}
      <Sparkles count={20} scale={[3, 3, 3]} size={2} speed={0.3} color="#a78bfa" opacity={0.5} />
    </group>
  )
}

export default function HeroCharacter() {
  const mouse = useRef({ x: 0, y: 0 })
  const gpu = useDetectGPU()
  const lowTier = gpu?.tier !== undefined && gpu.tier < 2

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      }}
      onPointerLeave={() => {
        mouse.current = { x: 0, y: 0 }
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 5], fov: 32 }}
        dpr={lowTier ? 1 : [1, 1.75]}
        gl={{ antialias: !lowTier, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[3, -2, 2]} intensity={0.6} color="#0a84ff" />

        <Suspense fallback={null}>
          <Avatar mouse={mouse} />
        </Suspense>

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.4}
          scale={5}
          blur={2.4}
          far={3}
        />
      </Canvas>
    </div>
  )
}
