import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenisScroll(active: boolean) {
  useEffect(() => {
    if (!active) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.08,
    })

    let rafId: number

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [active])
}