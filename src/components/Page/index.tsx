import React from 'react'

import MainLayout from '../MainLayout'
import DefaultSEO from './DefaultSEO'
import DocumentationLayout from '../Documentation/Layout'
import AlertLandingLayout from '../AlertLandingLayout'
import ModesProvider from "../Home/components/organisms/SwitchableMode/Provider"

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
    } else if (props.pageContext.isAlertLanding) {
      LayoutComponent = AlertLandingLayout
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
