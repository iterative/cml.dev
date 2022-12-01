import SEO from '@dvcorg/gatsby-theme-iterative/src/components/SEO'
import React from 'react'

import Home from '../components/pages/Home'

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <Home />
    </>
  )
}

export default HomePage
