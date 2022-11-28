import React from 'react'

import DefaultSEO from './DefaultSEO'

import { useRedirects, useAnchorNavigation, useSmoothScroll } from './utils'

import './base.css'
import './fonts.css'
import WrappedLayout from '../../../../components/layouts/WrappedLayout'

import { LayoutModifiers } from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'

export { LayoutModifiers }

export interface IPageProps {
  location: {
    pathname: string
  }
  pageContext: {
    is404: boolean
    isDocs: boolean
    pageInfo?: {
      currentPage: number
      nextPage?: string
    }
  }
  children: React.ReactNode
  enableSmoothScroll: boolean
}

const Page: React.FC<IPageProps> = props => {
  const LayoutComponent = WrappedLayout

  useRedirects()
  useAnchorNavigation()
  useSmoothScroll(props.enableSmoothScroll)

  return (
    <>
      <DefaultSEO />
      <LayoutComponent {...props} />
    </>
  )
}

export default Page
