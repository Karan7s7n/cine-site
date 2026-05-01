import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Shader Storytelling',
    desc: 'Transitions are cinematic environmental transformations instead of simple page cuts.',
  },
  {
    title: 'Interactive Depth',
    desc: 'Layered dimensional composition makes each section feel physically alive.',
  },
  {
    title: 'Scroll Choreography',
    desc: 'Narrative progression is tied directly to the user momentum and scroll force.',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(trackRef.current, {
      xPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1800',
        scrub: true,
        pin: true,
      },
    })
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(el, {
      rotateY: x / 20,
      rotateX: -y / 20,
      scale: 1.04,
      duration: 0.4,
    })
  }

  const resetMove = (el: HTMLDivElement) => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
    })
  }

  return (
    <section ref={sectionRef} className='relative h-screen bg-black overflow-hidden'>
      <div className='absolute top-16 left-16 z-20'>
        <h2 className='text-6xl font-semibold'>Engineered Experiences</h2>
        <p className='text-white/50 mt-4 max-w-xl'>Every panel is designed to react, move and breathe like a living interface.</p>
      </div>

      <div ref={trackRef} className='flex gap-16 absolute left-[20vw] top-1/2 -translate-y-1/2 w-[220vw] px-20'>
        {cards.map((card, i) => (
          <div
            key={i}
            onMouseMove={(e) => handleMove(e, e.currentTarget)}
            onMouseLeave={(e) => resetMove(e.currentTarget)}
            className='w-[520px] h-[320px] rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 flex flex-col justify-end transition-transform will-change-transform'
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h3 className='text-3xl mb-4'>{card.title}</h3>
            <p className='text-white/50 leading-relaxed'>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
