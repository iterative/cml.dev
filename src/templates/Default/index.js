import React from "react"
import PropTypes from "prop-types"
import SubscribeSection from "components/molecules/SubscribeSection"
import BaseLayout from "templates/Base"

import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <main id="main">{children}</main>
      <SubscribeSection />
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </BaseLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
