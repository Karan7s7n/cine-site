import { useState } from 'react'

import SplashBoot from '../components/scenes/SplashBoot'
import HeroScene from '../components/scenes/HeroScene'
import AboutScene from '../components/scenes/AboutScene'
import FeatureRailScene from '../components/scenes/FeatureRailScene'
import WebGLScene from '../components/scenes/WebGLScene'
import FooterScene from '../components/scenes/FooterScene'

import MorphOverlay from '../components/core/MorphOverlay'
import LiquidDivider from '../components/core/LiquidDivider'
import FloatingNav from '../components/core/FloatingNav'
import ChapterTitle from '../components/core/ChapterTitle'

import useLenisScroll from '../hooks/useLenisScroll'
import useGsapSync from '../hooks/useGsapSync'

export default function PageTimeline() {
  const [hideSplash, setHideSplash] = useState(false)

  useLenisScroll(hideSplash)
  useGsapSync(hideSplash)

  return (
    <main className='bg-black text-white overflow-x-hidden'>
      <MorphOverlay />
      <FloatingNav />

      <HeroScene />
      <ChapterTitle word='POSSIBILITY' />
      <LiquidDivider />
      <AboutScene />

      <ChapterTitle word='PRECISION' />
      <LiquidDivider />
      <FeatureRailScene />

      <ChapterTitle word='MOTION' />
      <LiquidDivider />
      <WebGLScene />

      <ChapterTitle word='IMMERSION' />
      <LiquidDivider />
      <FooterScene />


      {!hideSplash && (
        <SplashBoot onComplete={() => setHideSplash(true)} />
      )}
    </main>
  )
}