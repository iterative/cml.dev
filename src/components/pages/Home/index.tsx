import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { Theme } from '@theme-ui/css';
import theme from '../../../gatsby-plugin-theme-ui'
import HeroSection from './HeroSection'
import UseCasesSection from './UseCasesSection'
import MLOpsSection from './MLOpsSection'
import SubscribeSection from '../../molecules/SubscribeSection'
import SiteFooter from '../../organisms/SiteFooter'

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme as Theme}>
      <HeroSection />
      <UseCasesSection />
      <MLOpsSection />
      <SubscribeSection />
      <SiteFooter />
    </ThemeProvider>
  )
}

export default Home
