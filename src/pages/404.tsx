import React from 'react'
import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
import { PageProps } from 'gatsby'

import NotFound from '../components/pages/NotFound'
import SEO from '../components/organisms/SEO'

const NotFoundPage = ({ location }: PageProps) => (
  <MainLayout location={location}>
    <SEO
      title="404 | This page could not be found"
      description="404 | This page could not be found"
    />
    <NotFound />
  </MainLayout>
)

export default NotFoundPage
