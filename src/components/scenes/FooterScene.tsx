import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FooterScene() {
  const section = useRef<HTMLElement>(null)
  const box = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!section.current || !box.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        box.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.to(box.current, {
        y: -50,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={section}
      className='relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]' />

      <div ref={box} className='relative z-10 text-center px-6'>
        <h2 className='text-6xl md:text-8xl font-semibold tracking-tight'>
          Ready to launch?
        </h2>
        <p className='mt-8 opacity-60 text-lg md:text-xl'>
          This is only the beginning.
        </p>
      </div>
    </section>
  )
}