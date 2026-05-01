import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicFooter() {
  const footerRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      blobRef.current,
      { scale: 0.2, opacity: 0.2 },
      {
        scale: 7,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className='relative h-screen overflow-hidden bg-black flex items-center justify-center'>
      <div
        ref={blobRef}
        className='absolute w-[300px] h-[300px] rounded-full bg-white/10 blur-[120px]'
      />

      <div className='relative z-10 text-center'>
        <h2 className='text-7xl font-semibold'>Build Beyond Ordinary</h2>
        <p className='mt-6 text-white/50 text-xl'>Interfaces should feel unforgettable.</p>
        <button className='mt-10 px-10 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all'>
          Begin Experience
        </button>
      </div>
    </footer>
  )
}
