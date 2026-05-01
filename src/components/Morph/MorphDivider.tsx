import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { interpolate } from 'flubber'

gsap.registerPlugin(ScrollTrigger)

export default function MorphDivider() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const from = 'M0,100 Q400,0 800,100 T1600,100 V300 H0 Z'
    const to = 'M0,150 Q400,250 800,150 T1600,150 V300 H0 Z'
    const mixer = interpolate(from, to)

    gsap.to({}, {
      scrollTrigger: {
        trigger: pathRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      onUpdate: function () {
        const p = mixer(this.progress())
        pathRef.current?.setAttribute('d', p)
      },
    })
  }, [])

  return (
    <svg viewBox='0 0 1600 300' className='block w-full bg-transparent'>
      <path ref={pathRef} fill='black' d='M0,100 Q400,0 800,100 T1600,100 V300 H0 Z' />
    </svg>
  )
}
