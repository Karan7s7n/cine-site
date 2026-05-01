import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LiquidDivider() {
  const fog1 = useRef<HTMLDivElement>(null)
  const fog2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(fog1.current, {
      x: 120,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(fog2.current, {
      x: -100,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <div className='relative h-52 overflow-hidden -mt-8 -mb-8 z-10 bg-black'>
      <div
        ref={fog1}
        className='absolute left-[-10%] top-0 w-[70%] h-full rounded-full blur-[90px] bg-white/[0.035]'
      />

      <div
        ref={fog2}
        className='absolute right-[-10%] top-0 w-[65%] h-full rounded-full blur-[110px] bg-white/[0.02]'
      />

      <div className='absolute inset-0 bg-gradient-to-b from-black via-zinc-950/70 to-black' />
    </div>
  )
}