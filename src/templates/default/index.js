import { graphql } from "gatsby"
import React from "react"
import PropTypes from "prop-types"
import SubscribeSection from "components/molecules/SubscribeSection"
import BaseLayout from "templates/base"
import { ThemeProvider } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import theme from "gatsby-plugin-theme-ui"

import Header from "./Header"
import Footer from "./Footer"

export const Layout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <main id="main">{children}</main>
      <SubscribeSection />
      <Footer />
    </BaseLayout>
  )
}

const MDXLayout = ({
  data: {
    mdx: { body },
  },
}) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  </ThemeProvider>
)

export const query = graphql`
  query MDXPageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MDXLayout
