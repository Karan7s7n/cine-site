import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroScene() {
  const section = useRef<HTMLElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const sub = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!section.current || !image.current || !title.current || !sub.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image.current,
        { scale: 1.25, opacity: 0 },
        { scale: 1.05, opacity: 0.62, duration: 2.4, ease: 'power3.out' }
      )

      gsap.fromTo(
        title.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.7, delay: 0.25, ease: 'power4.out' }
      )

      gsap.fromTo(
        sub.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 0.75, duration: 1.4, delay: 0.65, ease: 'power3.out' }
      )

      const move = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 45
        const y = (e.clientY / window.innerHeight - 0.5) * 30

        gsap.to(image.current, {
          x,
          y,
          scale: 1.08,
          duration: 1.8,
          overwrite: 'auto',
          ease: 'power3.out',
        })
      }

      window.addEventListener('mousemove', move)

      return () => {
        window.removeEventListener('mousemove', move)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={section}
      data-chapter='POSSIBILITY'
      className='h-screen relative flex items-center justify-center overflow-hidden bg-black'
    >
      <img
        ref={image}
        src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80'
        className='absolute inset-0 w-[110%] h-[110%] object-cover'
      />

      <div className='absolute inset-0 bg-black/30' />
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_85%)]' />

      <div className='relative z-10 text-center px-6'>
        <div className='text-xs uppercase tracking-[0.45em] opacity-45 mb-8'>
          DIGITAL EDITION 2026
        </div>

        <h1
          ref={title}
          className='text-6xl md:text-[10rem] leading-[0.88] font-semibold tracking-tight'
        >
          Beyond<br />Motion
        </h1>

        <p ref={sub} className='mt-8 text-lg md:text-xl opacity-70'>
          Scroll to enter the cinematic experience
        </p>
      </div>

      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.35em] opacity-40 animate-pulse'>
        ↓ SCROLL
      </div>
    </section>
  )
}