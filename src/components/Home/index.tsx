import React, { useRef, useCallback } from 'react'
import HeroSection from './sections/HeroSection'
import UseCasesSection from './sections/UseCasesSection'
import MLOpsSection from './sections/MLOpsSection'
import SubscribeSection from './components/molecules/SubscribeSection'
import SiteFooter from './components/organisms/SiteFooter'

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <UseCasesSection />
      <MLOpsSection />
      <SubscribeSection />
      <SiteFooter />
    </>
  )
}

export default Home
