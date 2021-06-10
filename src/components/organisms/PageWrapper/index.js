import React from 'react'
import Page from '../Page'
import { ThemeProvider } from 'theme-ui'
import { Theme } from '@theme-ui/css'
import theme from '../../../gatsby-plugin-theme-ui'

export default function PageWrapper({ element, props }) {
  return (
    <ThemeProvider theme={theme}>
      <Page {...props}>{element}</Page>
    </ThemeProvider>
  )
}
