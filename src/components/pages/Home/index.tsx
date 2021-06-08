import React, { useRef, useCallback } from 'react'
import HeroSection from './HeroSection'
import UseCasesSection from './UseCasesSection'
import MLOpsSection from './MLOpsSection'
import SubscribeSection from '../../molecules/SubscribeSection'
import SiteFooter from '../../organisms/SiteFooter'

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
