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
    href: "https://github.com/iterative/cml#readme",
  },
  {
    label: "GitHub",
    href: "https://github.com/iterative/cml",
  },
]

function Header() {
  return (
    <Box as="header" variant="layout.Header">
      <Container variant="layout.Header.Inner">
        <Link to="/" variant="layout.Header.Logo">
          <Image src={logo} alt="CML" />
        </Link>
        <Box as="nav" variant="layout.Header.Nav" id="header-nav">
          {navItems.map(({ label, href }, i) => {
            const isRelative = href.startsWith("#")
            return (
              <NavLink
                href={href}
                label={label}
                key={i}
                variant="layout.Footer.Nav.Link"
                target={isRelative ? undefined : "_blank"}
                rel={
                  href.startsWith("http") ? undefined : "noopener noreferrer"
                }
              >
                {label}
              </NavLink>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
