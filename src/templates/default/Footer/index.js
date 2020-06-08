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

function Footer() {
  return (
    <Box as="footer" variant="layout.Footer">
      <Container variant="layout.Footer.Inner">
        <Link to="/" variant="layout.Footer.Logo">
          <Image src={logo} />
        </Link>
        <Box as="nav" variant="layout.Footer.Nav" id="site-nav">
          {navItems.map(({ label, href }, i) => (
            <NavLink
              href={href}
              label={label}
              key={i}
              variant="layout.Footer.Nav.Link"
            >
              {label}
            </NavLink>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
