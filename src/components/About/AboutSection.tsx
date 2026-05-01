import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true,
        },
      }
    )

    gsap.fromTo(
      textRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={ref}
      className="section-spacing flex items-center justify-center px-6 bg-[#050505] border-b border-white/5"
    >
      <div className="max-w-5xl text-center">
        <p className="tracking-[0.4em] uppercase text-xs text-white/40 mb-5">
          Engineered Storytelling
        </p>

        <h2
          ref={titleRef}
          className="text-5xl md:text-8xl font-semibold leading-tight glow-text"
        >
          Every Scroll Becomes A Narrative Shift
        </h2>

        <p
          ref={textRef}
          className="mt-8 max-w-3xl mx-auto text-white/65 text-lg md:text-2xl leading-relaxed"
        >
          We are no longer building static websites. We are building responsive
          cinematic systems where each movement transforms light, texture,
          perspective and emotional momentum.
        </p>
      </div>
    </section>
  )
}