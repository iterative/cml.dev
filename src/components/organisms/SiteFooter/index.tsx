import React from 'react'

import { Box, Container, Flex, Heading } from '@theme-ui/components'
import SiteLogo from '../../molecules/SiteLogo'
import SmartLink from '../../atoms/SmartLink'

import { ReactComponent as DiscordIcon } from '@media/icons/discord.svg'
import { ReactComponent as TwitterIcon } from '@media/icons/twitter.svg'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as YoutubeIcon } from '@media/icons/youtube.svg'
import { ReactComponent as LinkedInIcon } from '@media/icons/linkedin.svg'
import { ReactComponent as IterativeIcon } from '@media/icons/iterative.svg'
import dvcIcon from '@media/icons/dvc.svg'
import cmlIcon from '@media/icons/cml.svg'
import studioIcon from '@media/icons/studio.svg'
import mlemIcon from '@media/icons/mlem.svg'

interface ISocialLinkPopupProps {
  url: string
  icon: JSX.Element
  title: string
}

interface IFooterListPopupItem {
  text: string
  icon?: JSX.Element
  url: string
}
interface IFooterListPopupProps {
  title: string
  items: Array<IFooterListPopupItem>
}

const footerLists: Array<IFooterListPopupProps> = [
  {
    title: 'About',
    items: [
      {
        text: 'Install',
        url: 'https://github.com/iterative/cml#install-cml-as-a-package'
      },
      { text: 'Use cases', url: '/#use-cases' },
      { text: 'Blog', url: 'https://dvc.org/blog' },
      { text: 'Github', url: 'https://github.com/iterative/cml' }
    ]
  },
  {
    title: 'Community',
    items: [
      {
        text: 'Twitter',
        icon: <TwitterIcon width="16" height="16" />,
        url: 'https://twitter.com/DVCorg'
      },
      {
        text: 'Youtube',
        icon: <YoutubeIcon width="16" height="16" />,
        url: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ'
      },
      {
        text: 'Linkedin',
        icon: <LinkedInIcon width="16" height="16" />,
        url: 'https://www.linkedin.com/company/iterative-ai'
      },
      {
        text: 'Discord',
        icon: <DiscordIcon width="16" height="16" />,
        url: 'https://www.dvc.org/chat'
      }
    ]
  },
  {
    title: 'Company',
    items: [
      { text: 'About us', url: 'https://iterative.ai/about/' },
      { text: 'Join us', url: 'https://iterative.ai/about#career' },
      { text: 'Media Kit', url: 'https://iterative.ai/brand' }
    ]
  },
  {
    title: 'Other Tools',
    items: [
      {
        text: 'DVC',
        icon: <Box as="span" sx={{ backgroundImage: `url("${dvcIcon}")` }} />,

        url: 'https://dvc.org/'
      },
      {
        text: 'CML',
        icon: <Box as="span" sx={{ backgroundImage: `url("${cmlIcon}")` }} />,

        url: '/'
      },
      {
        text: 'Studio',
        icon: (
          <Box
            as="span"
            sx={{
              backgroundImage: `url("${studioIcon}")`
            }}
          />
        ),
        url: 'https://studio.iterative.ai/'
      },
      {
        text: 'MLEM',
        icon: (
          <Box
            as="span"
            sx={{
              backgroundImage: `url("${mlemIcon}")`
            }}
          />
        ),
        url: 'https://mlem.ai/'
      }
    ]
  }
]

const socialLinkDefinitions: Array<ISocialLinkPopupProps> = [
  {
    url: 'https://github.com/iterative/cml',
    icon: <GithubIcon width="24" height="24" />,
    title: 'CML GitHub repo'
  },
  {
    url: 'https://twitter.com/DVCorg',
    icon: <TwitterIcon width="24" height="24" />,
    title: 'DVC Twitter'
  },
  {
    url: 'https://www.youtube.com/channel/UC37rp97Go-xIX3aNFVHhXfQ',
    icon: <YoutubeIcon width="24" height="24" />,
    title: 'DVC.org Youtube Channel'
  },
  {
    url: 'https://www.linkedin.com/company/iterative-ai',
    icon: <LinkedInIcon width="24" height="24" />,
    title: 'Iterative LinkedIn'
  },
  {
    url: 'https://www.dvc.org/chat',
    icon: <DiscordIcon width="26" height="26" />,
    title: 'DVC Discord chat'
  }
]

const FooterList: React.FC<IFooterListPopupProps> = ({ title, items }) => (
  <Flex as="ul" variant="layout.Footer.List">
    <Heading variant="layout.Footer.List.Title" as="h2">
      {title}
    </Heading>
    {items.map(({ text, icon, url }: IFooterListPopupItem, i: number) => (
      <Flex key={i} as="li">
        <SmartLink variant="layout.Footer.List.Link" href={url}>
          {icon}
          {text}
        </SmartLink>
      </Flex>
    ))}
  </Flex>
)

const SocialLink: React.FC<ISocialLinkPopupProps> = ({ url, icon, title }) => (
  <SmartLink
    href={url}
    variant="styles.SocialLinkIcon"
    title={title}
    sx={{
      display: 'inline-block',
      textAlign: 'center',
      py: 2,
      px: 1
    }}
  >
    {icon}
  </SmartLink>
)

const Footer: React.FC = () => {
  return (
    <Box as="footer" variant="layout.Footer">
      <Container variant="layout.Footer.Inner">
        <SiteLogo variant="layout.Footer.Logo" />
        <Flex variant="layout.Footer.Lists">
          {footerLists.map((footerList, i) => (
            <FooterList key={i} {...footerList} />
          ))}
        </Flex>
        <Flex as="p" variant="layout.Footer.CompanyLabel">
          <Box variant="layout.Footer.CompanyLabel.Line" as="span">
            By{' '}
            <SmartLink href="https://iterative.ai/">
              {<IterativeIcon width="22" height="22" />}
              <Box as="span" variant="layout.GradientText">
                iterative.ai
              </Box>
            </SmartLink>
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
