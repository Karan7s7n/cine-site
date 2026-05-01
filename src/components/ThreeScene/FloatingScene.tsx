import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Orb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    ref.current.rotation.x += 0.003
    ref.current.rotation.y += 0.004
    ref.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color='white' metalness={1} roughness={0.1} wireframe />
      </mesh>
    </Float>
  )
}

function CenterPanel() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.15
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[3.5, 4.5, 0.3]} />
      <meshStandardMaterial color='white' metalness={1} roughness={0.05} />
    </mesh>
  )
}

export default function FloatingScene() {
  return (
    <section className='relative min-h-screen h-[120vh] bg-black z-30'>
      <div className='absolute z-20 top-20 left-20'>
        <h2 className='text-6xl font-semibold'>Dimensional Narrative</h2>
        <p className='text-white/50 mt-4 max-w-xl'>A living visual ecosystem that reacts in layered depth as the user moves through the story.</p>
      </div>

      <Canvas style={{ position: 'absolute', inset: 0 }} camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={5} />
        <Environment preset='city' />

        <CenterPanel />
        <Orb position={[-5, 2, -2]} />
        <Orb position={[5, -2, -3]} />
        <Orb position={[0, 3, -4]} />
        <Orb position={[-3, -3, -1]} />
      </Canvas>
    </section>
  )
}