import React from "react"
import SEO from "./SEO"
import ModesProvider from "components/organisms/SwitchableMode/Provider"

const Layout = ({ children }) => {
  return (
    <ModesProvider>
      <SEO />
      {children}
    </ModesProvider>
  )
}

export default Layout
