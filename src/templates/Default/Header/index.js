import React from "react"
import Link from "components/atoms/ThemedGatsbyLink"
import { Box, Image, NavLink, Container } from "@theme-ui/components"

import logo from "images/logo.png"

const navItems = [
  {
    label: "Use Cases",
    href: "#use-cases",
  },
  {
    label: "Docs",
    href: "#docs",
  },
  {
    label: "GitHub",
    href: "https://www.github.com",
  },
]

function Header() {
  return (
    <Box as="header" variant="layout.header">
      <Container variant="layout.header.inner">
        <Link to="/" variant="layout.header.logo">
          <Image src={logo} />
        </Link>
        <Box as="nav" variant="layout.header.nav" id="site-nav">
          {navItems.map(({ label, href }, i) => (
            <NavLink
              href={href}
              label={label}
              key={i}
              variant="layout.header.nav.link"
            >
              {label}
            </NavLink>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
