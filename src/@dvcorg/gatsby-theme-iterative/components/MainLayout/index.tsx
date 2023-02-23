import React from 'react'
import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'

import ModesProvider from '../../../../components/organisms/SwitchableMode/Provider'
import { PageProps } from 'gatsby'
export * from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
const WrapMainLayout = ({ children, location, ...rest }: PageProps) => {
  return (
    <ModesProvider>
      <MainLayout location={location} {...rest}>
        {children}
      </MainLayout>
    </ModesProvider>
  )
}

export default WrapMainLayout
