import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGsapSync(active: boolean) {
  useEffect(() => {
    if (!active) return

    const update = () => ScrollTrigger.update()

    gsap.ticker.add(update)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(update)
    }
  }, [active])
}