import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CinematicLoader({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [progress, setProgress] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let count = 0

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 4

      if (count >= 100) {
        count = 100
        clearInterval(interval)

        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => onComplete(),
          })

          if (textRef.current && imageRef.current && wrapRef.current) {
            tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.7 })
              .to(imageRef.current, { scale: 1.2, opacity: 1, duration: 1.1 }, '-=0.3')
              .to(wrapRef.current, { opacity: 0, duration: 0.9 })
          }
        }, 300)
      }

      setProgress(count)
    }, 90)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute w-[420px] h-[420px] rounded-full opacity-20 blur-3xl scale-75"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)',
        }}
      />

      <div ref={textRef} className="relative z-10 text-center">
        <p className="tracking-[0.5em] text-xs uppercase text-white/50 mb-6">
          Initializing Experience
        </p>
        <h1 className="text-7xl md:text-9xl font-semibold glow-text">{progress}%</h1>
      </div>
    </div>
  )
}