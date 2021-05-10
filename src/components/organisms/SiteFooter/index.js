import React from "react"
import GatsbyLink from "components/atoms/ThemedGatsbyLink"
import { Box, Container, Link, Flex, Heading } from "@theme-ui/components"
import SmartLink from "components/atoms/SmartLink"

import SiteLogo from "components/atoms/SiteLogo"

import DiscordIcon from "media/icons/discord.svg"
import TwitterIcon from "media/icons/twitter.svg"
import GithubIcon from "media/icons/github.svg"
import YoutubeIcon from "media/icons/youtube.svg"
import LinkedInIcon from "media/icons/linkedin.svg"
import CmlIcon from "media/icons/cml.svg"
import DvcIcon from "media/icons/dvc.svg"
import StudioIcon from "media/icons/studio.svg"
import IterativeIcon from "media/icons/iterative.svg"

const footerLists = [
  {
    title: "About",
    items: [
      {
        text: "Install",
        url: "https://github.com/iterative/cml#install-cml-as-a-package",
      },
      { text: "Use cases", url: "https://cml.dev#use-cases" },
      { text: "Blog", url: "https://dvc.org/blog" },
      { text: "Github", url: "https://github.com/iterative/cml" },
    ],
  },
  {
    title: "Community",
    items: [
      {
        text: "Twitter",
        icon: <TwitterIcon width="16" height="16" />,
        url: "https://twitter.com/DVCorg",
      },
      {
        text: "Youtube",
        icon: <YoutubeIcon width="16" height="16" />,
        url: "https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ",
      },
      {
        text: "Linkedin",
        icon: <LinkedInIcon width="16" height="16" />,
        url: "https://www.linkedin.com/company/iterative-ai",
      },
      {
        text: "Discord",
        icon: <DiscordIcon width="16" height="16" />,
        url: "https://www.dvc.org/chat",
      },
    ],
  },
  {
    title: "Company",
    items: [
      { text: "About us", url: "https://iterative.ai/about/" },
      { text: "Github", url: "https://github.com/iterative" },
      { text: "Join us", url: "https://iterative.ai/about#career" },
    ],
  },
  {
    title: "Other Tools",
    items: [
      {
        text: "DVC",
        icon: <DvcIcon height="16" width="16" />,
        url: "https://dvc.org/",
      },
      {
        text: "CML",
        icon: <CmlIcon height="16" width="16" />,
        url: "https://cml.dev/",
      },
      {
        text: "Studio",
        icon: <StudioIcon height="16" width="16" />,
        url: "https://viewer.iterative.ai/",
      },
    ],
  },
]

const socialLinkDefinitions = [
  {
    url: "https://github.com/iterative/cml",
    icon: <GithubIcon width="24" height="24" />,
    title: "CML GitHub repo",
  },
  {
    url: "https://twitter.com/DVCorg",
    icon: <TwitterIcon width="24" height="24" />,
    title: "DVC Twitter",
  },
  {
    url: "https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ",
    icon: <YoutubeIcon width="24" height="24" />,
    title: "DVC.org Youtube Channel",
  },
  {
    url: "https://www.linkedin.com/company/iterative-ai",
    icon: <LinkedInIcon width="24" height="24" />,
    title: "Iterative LinkedIn",
  },
  {
    url: "https://www.dvc.org/chat",
    icon: <DiscordIcon width="26" height="26" />,
    title: "DVC Discord chat",
  },
]

const FooterList = ({ title, items }) => (
  <Flex as="ul" variant="layout.Footer.List">
    <Heading variant="layout.Footer.List.Title" as="h2">
      {title}
    </Heading>
    {items.map(({ text, icon = "", url }, i) => (
      <Flex key={i} as="li">
        <SmartLink variant="layout.Footer.List.Link" href={url}>
          {icon}
          {text}
        </SmartLink>
      </Flex>
    ))}
  </Flex>
)

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

function Footer() {
  return (
    <Box as="footer" variant="layout.Footer">
      <Container variant="layout.Footer.Inner">
        <GatsbyLink to="/" variant="layout.Footer.Logo">
          <SiteLogo />
        </GatsbyLink>
        <Flex variant="layout.Footer.Lists">
          {footerLists.map((footerList, i) => (
            <FooterList key={i} {...footerList} />
          ))}
        </Flex>
        <Flex as="p" variant="layout.Footer.CompanyLabel">
          <Box variant="layout.Footer.CompanyLabel.Line" as="span">
            By {<IterativeIcon width="22" height="22" />}
            <Box as="span" variant="layout.GradientText">
              Iterative.ai
            </Box>
          </Box>
          <Box variant="layout.Footer.CompanyLabel.Line" as="span">
            <Box as="span"> - </Box>An open platform to operationalize AI
          </Box>
        </Flex>
        <Box variant="layout.Footer.SocialIcons">
          {socialLinkDefinitions.map(({ url, icon, title }, i) => (
            <SocialLink url={url} icon={icon} title={title} key={i} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
