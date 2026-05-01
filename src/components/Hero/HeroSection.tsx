import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          x,
          y,
          duration: 1.5,
          ease: 'power3.out',
        })
      }
    }

    window.addEventListener('mousemove', move)

    gsap.fromTo(
      titleRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.4 }
    )

    gsap.fromTo(
      subRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.9 }
    )

    gsap.to(bgRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black" />

      <div className="relative z-10 text-center max-w-5xl px-6">
        <p className="mb-6 tracking-[0.4em] uppercase text-white/50 text-xs">
          Beyond Interactive Motion
        </p>

        <h1
          ref={titleRef}
          className="text-6xl md:text-9xl font-semibold leading-none glow-text"
        >
          Build The Future In Motion
        </h1>

        <p
          ref={subRef}
          className="mt-8 text-white/70 max-w-2xl mx-auto text-lg md:text-xl"
        >
          A cinematic digital experience engineered with immersive scroll choreography,
          shader transitions and living depth.
        </p>
      </div>
    </section>
  )
}