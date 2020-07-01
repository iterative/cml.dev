import React from "react"
import theme from "gatsby-plugin-theme-ui"
import { graphql } from "gatsby"
import { ThemeProvider } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"

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

export default MDXLayout
