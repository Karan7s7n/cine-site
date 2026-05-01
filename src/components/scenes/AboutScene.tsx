import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutScene() {
  const root = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        right.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.6,
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
      data-chapter='PRECISION'
      ref={root}
      className='min-h-screen bg-black px-8 md:px-24 py-32 flex items-center'
    >
      <div className='grid md:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto'>

        <div ref={left}>
          <div className='text-sm uppercase tracking-[0.35em] opacity-40 mb-6'>
            ENGINEERED EXPERIENCE
          </div>

          <h2 className='text-5xl md:text-7xl leading-[0.95] font-semibold mb-8'>
            We build digital cinema.
          </h2>

          <p className='text-lg md:text-xl opacity-65 leading-relaxed max-w-xl'>
            Precision engineered scroll choreography, liquid morph transitions,
            layered WebGL depth, narrative chapter progression and tactile motion
            systems designed to feel premium at every pixel.
          </p>
        </div>

        <div
          ref={right}
          className='h-[500px] rounded-[2rem] relative overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800'
        >
          <img
            src='https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop'
            className='absolute inset-0 w-full h-full object-cover opacity-55'
          />

          <div className='absolute inset-0 bg-black/30' />

          <div className='absolute bottom-10 left-10 text-sm uppercase tracking-[0.3em] opacity-60'>
            Motion • Depth • Story • Interaction
          </div>
        </div>

      </div>
    </section>
  )
}