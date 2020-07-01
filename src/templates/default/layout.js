import React from "react"
import BaseLayout from "templates/base/layout"

import Header from "components/organisms/SiteHeader"
import Footer from "components/organisms/SiteFooter"
import SubscribeSection from "components/molecules/SubscribeSection"

const Layout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <main id="main">{children}</main>
      <SubscribeSection />
      <Footer />
    </BaseLayout>
  )
}

export default Layout
