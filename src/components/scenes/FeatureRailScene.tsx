import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Realtime Motion',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Scroll Storytelling',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'ThreeJS Layers',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Morph Interactions',
    img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Visual Presence',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Cinematic Systems',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
  }
]

export default function FeatureRailScene() {
  const rail = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rail.current || !inner.current) return

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.rail-card') as HTMLElement[]
      const totalMove = inner.current!.scrollWidth - window.innerWidth

      const horizontal = gsap.to(inner.current, {
        x: -totalMove,
        ease: 'none',
        scrollTrigger: {
          trigger: rail.current,
          pin: true,
          scrub: 1.1,
          start: 'top top',
          end: `+=${totalMove}`,
          invalidateOnRefresh: true,
        },
      })

      sections.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.82, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )
      })
    }, rail)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-chapter='MOTION'
      ref={rail}
      className='h-screen bg-black overflow-hidden relative'
    >
      <div className='absolute top-14 left-10 md:left-20 z-20'>
        <div className='text-xs uppercase tracking-[0.35em] opacity-40 mb-4'>
          SYSTEM MODULES
        </div>
        <h2 className='text-3xl md:text-5xl font-semibold'>Built for movement.</h2>
      </div>

      <div
        ref={inner}
        className='flex gap-10 h-full items-center px-[10vw] will-change-transform'
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className='rail-card relative min-w-[78vw] md:min-w-[60vw] h-[68vh] rounded-[2.5rem] overflow-hidden border border-white/10'
          >
            <img
              src={card.img}
              className='absolute inset-0 w-full h-full object-cover opacity-55'
            />

            <div className='absolute inset-0 bg-black/35' />

            <div className='absolute bottom-10 left-10 text-4xl md:text-6xl font-semibold'>
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}