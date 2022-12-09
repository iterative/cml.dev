import SEO from '@dvcorg/gatsby-theme-iterative/src/components/SEO'
import React from 'react'
import ModesProvider from '../components/organisms/SwitchableMode/Provider'

import Home from '../components/pages/Home'

const HomePage: React.FC = () => {
  return (
    <ModesProvider>
      <SEO />
      <Home />
    </ModesProvider>
  )
}

export default HomePage
