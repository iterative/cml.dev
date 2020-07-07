import React from "react"
import GatsbyLink from "components/atoms/ThemedGatsbyLink"
import { Box, Image, Container, Link } from "@theme-ui/components"
import SmartLink from "components/atoms/SmartLink"

import logo from "images/logo.png"

import DiscordIcon from "media/icons/discord.svg"
import TwitterIcon from "media/icons/twitter.svg"
import GithubIcon from "media/icons/github.svg"

import DVCLogo from "media/icons/dvc-monochrome.svg"

const socialLinkDefinitions = [
  {
    url: "https://www.dvc.org/chat",
    icon: <DiscordIcon width="26" height="26" />,
    title: "DVC Discord chat",
  },
  {
    url: "https://twitter.com/DVCorg",
    icon: <TwitterIcon width="26" height="26" />,
    title: "DVC Twitter",
  },
  {
    url: "https://github.com/iterative/cml",
    icon: <GithubIcon width="26" height="26" />,
    title: "CML GitHub repo",
  },
]

const SocialLink = ({ url, icon, title }) => (
  <Link
    href={url}
    variant="styles.SocialLinkIcon"
    title={title}
    sx={{
      display: "inline-block",
      textAlign: "center",
      py: 2,
      px: 1,
    }}
  >
    {icon}
  </Link>
)

const navItems = [
  {
    label: "Use Cases",
    href: "#use-cases",
  },
  {
    label: "Blog",
    href: "https://www.dvc.org/blog",
  },
  {
    label: "GitHub",
    href: "https://www.github.com/iterative/cml",
  },
]

function Footer() {
  return (
    <Box as="footer" variant="layout.Footer">
      <Container variant="layout.Footer.Inner">
        <GatsbyLink to="/" variant="layout.Footer.Logo">
          <Image src={logo} alt="CML" />
        </GatsbyLink>
        <Box as="nav" variant="layout.Footer.Nav" id="footer-nav">
          {navItems.map(({ label, href }, i) => (
            <SmartLink href={href} variant="layout.Footer.Nav.Link" key={i}>
              {label}
            </SmartLink>
          ))}
        </Box>
        <Box variant="layout.Footer.SocialIcons">
          {socialLinkDefinitions.map(({ url, icon, title }, i) => (
            <SocialLink url={url} icon={icon} title={title} key={i} />
          ))}
        </Box>
        <Link variant="layout.Footer.PoweredBy" href="https://www.dvc.org">
          Powered by <DVCLogo height="14" width="24" aria-label="DVC" />
        </Link>
      </Container>
    </Box>
  )
}

export default Footer
