import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function FloatingNav() {
  const [active, setActive] = useState('INTRO')

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-chapter]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-chapter') || 'INTRO')
          }
        })
      },
      { threshold: 0.45 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const magnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4 })
  }

  const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5 })
  }

  return (
    <nav className='fixed top-5 left-1/2 -translate-x-1/2 z-[150] w-[92%] md:w-[80%] rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 flex items-center justify-between'>
      <div className='text-sm tracking-[0.35em] opacity-70'>CINEMA</div>
      <div className='text-sm tracking-[0.3em] opacity-60'>{active}</div>
      <button
        onMouseMove={magnetic}
        onMouseLeave={reset}
        className='rounded-full border border-white/20 px-6 py-2 text-sm'
      >
        ENTER
      </button>
    </nav>
  )
}