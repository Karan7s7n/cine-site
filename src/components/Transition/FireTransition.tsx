import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FireTransition() {
  const wrap = useRef<HTMLDivElement>(null)
  const holes = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // initial dark overlay burn layer
      gsap.fromTo(
        wrap.current,
        { opacity: 1 },
        { opacity: 1, duration: 0 }
      )

      // fire holes animation (burn-through reveal)
      gsap.to(holes.current, {
        scale: 25,
        opacity: 0,
        duration: 2.2,
        ease: 'power4.out',
        stagger: 0.15,
        onComplete: () => {
          gsap.to(wrap.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
          })
        }
      })

      // flicker animation (fire alive effect)
      gsap.to(holes.current, {
        filter: 'blur(30px) brightness(2)',
        repeat: -1,
        yoyo: true,
        duration: 0.12,
        stagger: 0.05
      })
    }, wrap)

    return () => ctx.revert()
  }, [])

  const setRef = (el: HTMLDivElement | null, i: number) => {
    if (el) holes.current[i] = el
  }

  return (
    <section
      ref={wrap}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
    >
      {/* underlying scene already exists behind this */}

      {/* dark burn layer */}
      <div className="absolute inset-0 bg-black" />

      {/* FIRE BURN HOLES */}
      <div
        ref={(el) => setRef(el, 0)}
        className="absolute top-[20%] left-[30%] w-24 h-24 bg-orange-500 rounded-full blur-2xl mix-blend-screen scale-0"
      />
      <div
        ref={(el) => setRef(el, 1)}
        className="absolute top-[45%] left-[55%] w-32 h-32 bg-yellow-400 rounded-full blur-3xl mix-blend-screen scale-0"
      />
      <div
        ref={(el) => setRef(el, 2)}
        className="absolute top-[60%] left-[35%] w-28 h-28 bg-red-500 rounded-full blur-2xl mix-blend-screen scale-0"
      />
      <div
        ref={(el) => setRef(el, 3)}
        className="absolute top-[35%] left-[75%] w-20 h-20 bg-orange-300 rounded-full blur-xl mix-blend-screen scale-0"
      />

      {/* heat glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_80%)]" />
    </section>
  )
}