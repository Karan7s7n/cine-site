import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LiquidTransition() {
  const wrap = useRef<HTMLDivElement>(null)
  const wave = useRef<SVGPathElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLDivElement>(null)
  const fog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = wrap.current
    if (!section || !wave.current || !bg.current) return

    const updateWave = (progress: number) => {
      const y = 100 - progress * 100
      const curveDepth = 24 + Math.sin(progress * Math.PI) * 24

      const path = `
        M0 ${y}
        C18 ${y - curveDepth}, 38 ${y + curveDepth}, 50 ${y}
        C62 ${y - curveDepth}, 82 ${y + curveDepth}, 100 ${y}
        V100 H0 Z
      `
      wave.current!.setAttribute('d', path)
    }

    updateWave(0)

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress

        updateWave(p)

        gsap.set(bg.current, {
          y: -p * 170,
          scale: 1.08 + p * 0.22,
        })

        gsap.set(text.current, {
          y: -p * 120,
          opacity: Math.sin(p * Math.PI) * 0.28,
        })

        gsap.set(fog.current, {
          y: -p * 60,
          opacity: 0.18 + p * 0.15,
        })
      },
    })
  }, [])

  return (
    <section
      ref={wrap}
      className='relative h-[150vh] overflow-hidden bg-black border-b border-white/5'
    >
      <div
        ref={bg}
        className='absolute inset-0 scale-110'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.28)',
        }}
      />

      <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black' />

      <div
        ref={fog}
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_65%)]'
      />

      <div
        ref={text}
        className='absolute inset-0 flex items-center justify-center text-[14vw] md:text-[10vw] font-semibold tracking-tight opacity-0 select-none'
      >
        TRANSITION
      </div>

      <svg
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        className='absolute inset-0 w-full h-full'
      >
        <path
          ref={wave}
          d='M0 100 C20 100,40 100,50 100 C60 100,80 100,100 100 V100 H0 Z'
          fill='#000'
        />
      </svg>
    </section>
  )
}