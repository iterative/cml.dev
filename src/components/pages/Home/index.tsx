import React from 'react'
import HeroSection from './HeroSection'
import UseCasesSection from './UseCasesSection'
import MLOpsSection from './MLOpsSection'
import SubscribeSection from '../../molecules/SubscribeSection'
import LayoutFooter from '@dvcorg/gatsby-theme-iterative/src/components/LayoutFooter'

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <UseCasesSection />
      <MLOpsSection />
      <SubscribeSection />
      <LayoutFooter />
    </>
  )
}

export default Home
