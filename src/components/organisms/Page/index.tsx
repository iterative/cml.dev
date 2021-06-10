import React from 'react'

import MainLayout from '../../layouts/MainLayout'
import DefaultSEO from './DefaultSEO'
import DocumentationLayout from '../../pages/Documentation/Layout'
import ModesProvider from "../SwitchableMode/Provider"

import { useRedirects, useAnchorNavigation, useSmoothScroll } from './utils'

import 'reset-css'
import './base.css'
import './fonts/fonts.css'

export interface IPageProps {
  location: {
    pathname: string
  }
  pageContext: {
    is404: boolean
    isDocs: boolean
    isBlog: boolean
    isAlertLanding: boolean
    pageInfo?: {
      currentPage: number
      nextPage?: string
    }
  }
  children: React.ReactNode
  enableSmoothScroll: boolean
}

const Page: React.FC<IPageProps> = props => {
  let LayoutComponent = MainLayout

  useRedirects()
  useAnchorNavigation()
  useSmoothScroll(props.enableSmoothScroll)

  if (!props.pageContext.is404) {
    if (props.pageContext.isDocs) {
      LayoutComponent = DocumentationLayout
    }
  }

  return (
    <ModesProvider>
      <DefaultSEO pathname={props.location.pathname} />
      <LayoutComponent {...props} />
    </ModesProvider>
  )
}

export default Page