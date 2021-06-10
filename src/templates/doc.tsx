import React from 'react'
import { graphql } from 'gatsby'
import { Node } from 'unist'
import { getItemByPath } from '../utils/shared/sidebar'

import SEO from '../components/organisms/SEO'

import Documentation from '../components/pages/Documentation'
import { ThemeProvider } from 'theme-ui'
import { Theme } from '@theme-ui/css';
import theme from '../gatsby-plugin-theme-ui'
interface IDocPageProps {
  data: {
    page: {
      htmlAst: Node
      title?: string
      description?: string
    }
  }
  pageContext: {
    slug: string
    headings: []
  }
}

const DocPage: React.FC<IDocPageProps> = ({
  data,
  pageContext: { slug, headings }
}) => {
  const {
    page: { htmlAst, title, description }
  } = data

  const { label } = getItemByPath(slug)

  return (
    <ThemeProvider theme={theme as Theme}>
      <SEO title={title || label} description={description} />
      <Documentation htmlAst={htmlAst} path={slug} headings={headings} />
    </ThemeProvider>
  )
}

export default DocPage

export const pageQuery = graphql`
  query DocPage($id: String!) {
    page: docsPage(id: { eq: $id }) {
      title
      description
      htmlAst
    }
  }
`
