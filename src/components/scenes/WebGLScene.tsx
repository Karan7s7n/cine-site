import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Stars() {
  const ref = useRef<THREE.Points>(null!)

  const sphere = useMemo(() => {
    const positions = new Float32Array(3500 * 3)

    for (let i = 0; i < 3500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24
    }

    return positions
  }, [])

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.015
    ref.current.rotation.y = state.clock.elapsedTime * 0.025
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial transparent size={0.028} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

export default function WebGLScene() {
  const root = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        right.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-chapter='IMMERSION'
      ref={root}
      className='h-screen relative bg-black overflow-hidden flex items-center'
    >
      <Canvas className='absolute inset-0'>
        <Stars />
      </Canvas>

      <div className='absolute inset-0 bg-black/25' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_85%)]' />

      <div className='relative z-10 grid md:grid-cols-2 gap-14 px-8 md:px-24 items-center w-full max-w-7xl mx-auto'>

        <div ref={left}>
          <div className='text-xs uppercase tracking-[0.4em] opacity-45 mb-6'>
            IMMERSIVE SYSTEM
          </div>

          <h2 className='text-5xl md:text-7xl leading-[0.92] font-semibold mb-8'>
            Depth that<br />moves with you.
          </h2>

          <p className='text-lg md:text-xl opacity-65 max-w-xl leading-relaxed'>
            Layered particle environments, ambient dimensional motion and subtle
            perspective shifts engineered to create the sensation of living digital space.
          </p>
        </div>

        <div
          ref={right}
          className='h-[460px] rounded-[2.5rem] overflow-hidden border border-white/10 relative'
        >
          <img
            src='https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1600&auto=format&fit=crop'
            className='absolute inset-0 w-full h-full object-cover opacity-55'
          />
          <div className='absolute inset-0 bg-black/35' />

          <div className='absolute bottom-8 left-8 text-sm uppercase tracking-[0.3em] opacity-55'>
            WebGL • Presence • Atmosphere
          </div>
        </div>
      </div>
    </section>
  )
}