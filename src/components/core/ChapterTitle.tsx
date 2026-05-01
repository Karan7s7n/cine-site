import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ChapterTitle({ word }: { word: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const giant = useRef<HTMLDivElement>(null)
  const small = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrap.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giant.current,
        {
          y: 220,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: -220,
          opacity: 0.1,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        small.current,
        { opacity: 0, y: 40 },
        {
          opacity: 0.45,
          y: 0,
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top 75%',
            end: 'center center',
            scrub: true,
          },
        }
      )
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrap}
      className='h-[85vh] bg-black flex flex-col items-center justify-center overflow-hidden relative'
    >
      <div
        ref={small}
        className='absolute top-20 text-[10px] md:text-xs uppercase tracking-[0.55em] opacity-30'
      >
        CHAPTER TRANSITION
      </div>

      <div
        ref={giant}
        className='text-[22vw] md:text-[14vw] font-semibold tracking-tight opacity-[0.04] select-none leading-none'
      >
        {word}
      </div>

      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_85%)]' />
    </section>
  )
}