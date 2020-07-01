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
    <Box as="header" variant="layout.Header">
      <Container variant="layout.Header.Inner">
        <Link to="/" variant="layout.Header.Logo">
          <Image src={logo} />
        </Link>
        <Box as="nav" variant="layout.Header.Nav" id="site-nav">
          {navItems.map(({ label, href }, i) => (
            <NavLink
              href={href}
              label={label}
              key={i}
              variant="layout.Header.Nav.Link"
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
