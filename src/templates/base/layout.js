import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "./SEO"
import ModesProvider from "components/organisms/SwitchableMode/Provider"

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ModesProvider>
      <SEO />
      {children}
    </ModesProvider>
  )
}

export default Layout
