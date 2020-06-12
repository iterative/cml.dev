import React from "react"
import GatsbyLink from "components/atoms/ThemedGatsbyLink"
import {
  Box,
  Image,
  NavLink,
  Container,
  Link,
  Text,
} from "@theme-ui/components"

import logo from "images/logo.png"

import SlackIcon from "media/icons/slack.svg"
import TwitterIcon from "media/icons/twitter.svg"
import GithubIcon from "media/icons/github.svg"

const socialLinkDefinitions = [
  {
    url: "#",
    icon: SlackIcon,
  },
  {
    url: "#",
    icon: TwitterIcon,
  },
  {
    url: "#",
    icon: GithubIcon,
  },
]

const SocialLink = ({ url, icon: Icon }) => (
  <Link
    href={url}
    sx={{
      display: "inline-block",
      textAlign: "center",
      py: 2,
      px: 1,
      ">svg": {
        width: "26px",
        height: "26px",
      },
    }}
  >
    <Icon />
  </Link>
)

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
        <GatsbyLink to="/" variant="layout.Footer.Logo">
          <Image src={logo} />
        </GatsbyLink>
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
        <Box variant="layout.Footer.SocialIcons">
          {socialLinkDefinitions.map(({ url, icon }, i) => (
            <SocialLink url={url} icon={icon} key={i} />
          ))}
        </Box>
        <Text variant="layout.Footer.PoweredBy">Powered by DVC</Text>
      </Container>
    </Box>
  )
}

export default Footer
