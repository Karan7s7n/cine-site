import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const p = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return p
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial transparent size={0.02} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}