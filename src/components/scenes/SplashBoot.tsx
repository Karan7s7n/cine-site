import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type SplashBootProps = {
  onComplete: () => void
}

export default function SplashBoot({ onComplete }: SplashBootProps) {
  const logo = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const percent = useRef<HTMLDivElement>(null)
  const splash = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logo.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 }
      )

      gsap.fromTo(line.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 2.5, delay: 0.4, ease: 'power2.inOut' }
      )

      let obj = { val: 0 }

      gsap.to(obj, {
        val: 100,
        duration: 2.5,
        delay: 0.4,
        ease: 'none',
        onUpdate: () => {
          if (percent.current) {
            percent.current.innerText = `${Math.floor(obj.val)}%`
          }
        },
        onComplete: () => {
          gsap.to([logo.current, line.current, percent.current], {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.05
          })

          const holes = gsap.utils.toArray('.burn-circle')

          gsap.to(holes, {
            attr: { r: 420 },
            duration: 2.2,
            stagger: 0.15,
            ease: 'power4.out',
            onStart: () => {
              setTimeout(() => onComplete(), 700)
            }
          })

          gsap.to('.burn-glow', {
            scale: 12,
            opacity: 0,
            duration: 2,
            stagger: 0.15,
            ease: 'power3.out'
          })

          gsap.to(splash.current, {
            opacity: 0,
            duration: 1,
            delay: 1.8
          })
        }
      })
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={splash}
      className='fixed inset-0 z-[99999] overflow-hidden pointer-events-none'
    >
      {/* SVG MASK BLACK LAYER */}
      <svg className='absolute inset-0 w-full h-full'>
        <defs>
          <mask id='burnMask'>
            <rect width='100%' height='100%' fill='white' />

            <circle className='burn-circle' cx='25%' cy='30%' r='0' fill='black' />
            <circle className='burn-circle' cx='65%' cy='40%' r='0' fill='black' />
            <circle className='burn-circle' cx='42%' cy='68%' r='0' fill='black' />
            <circle className='burn-circle' cx='78%' cy='70%' r='0' fill='black' />
          </mask>
        </defs>

        <rect
          width='100%'
          height='100%'
          fill='black'
          mask='url(#burnMask)'
        />
      </svg>

      {/* FIRE GLOW EDGES */}
      <div className='burn-glow absolute top-[30%] left-[25%] w-20 h-20 rounded-full bg-orange-500 blur-2xl opacity-70' />
      <div className='burn-glow absolute top-[40%] left-[65%] w-24 h-24 rounded-full bg-yellow-400 blur-2xl opacity-70' />
      <div className='burn-glow absolute top-[68%] left-[42%] w-20 h-20 rounded-full bg-orange-600 blur-2xl opacity-70' />
      <div className='burn-glow absolute top-[70%] left-[78%] w-20 h-20 rounded-full bg-red-500 blur-2xl opacity-70' />

      {/* BOOT UI */}
      <section className='absolute inset-0 bg-transparent flex flex-col items-center justify-center'>
        <div ref={logo} className='text-3xl md:text-5xl font-semibold tracking-[0.25em]'>
          BEYOND MOTION
        </div>

        <div className='mt-10 w-[260px] h-[1px] bg-white/10 overflow-hidden'>
          <div ref={line} className='w-full h-full bg-white' />
        </div>

        <div ref={percent} className='mt-5 text-sm opacity-60 tracking-[0.3em]'>
          0%
        </div>
      </section>
    </div>
  )
}