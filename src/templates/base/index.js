import React from "react"
import theme from "gatsby-plugin-theme-ui"
import { graphql } from "gatsby"
import { ThemeProvider } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import { Helmet } from "react-helmet"

import "./fonts.css"

const MDXLayout = ({
  data: {
    mdx: { body },
  },
}) => (
  <ThemeProvider theme={theme}>
    <Helmet>
      <link rel="preload" href="/fonts/DMSans-Regular.woff2" as="font" />
      <link rel="preload" href="/fonts/DMSans-Bold.woff2" as="font" />
      <link rel="preload" href="/fonts/DMMono-Regular.woff2" as="font" />
    </Helmet>
    <Layout>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  </ThemeProvider>
)

export default MDXLayout

export const query = graphql`
  query MDXBaseTemplatePageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`
