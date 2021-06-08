import React from 'react'

import NotFound from '../components/pages/NotFound'
import SEO from '../components/organisms/SEO'

const NotFoundPage: React.FC = () => (
  <>
    <SEO
      title="404 | This page could not be found"
      description="404 | This page could not be found"
    />
    <NotFound />
  </>
)

export default NotFoundPage
