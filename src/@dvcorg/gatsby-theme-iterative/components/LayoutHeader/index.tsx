import React from 'react'
import { Flex, Box, Container, Button } from '@theme-ui/components'
import InstallPopup from '../../../../components/molecules/InstallPopup'
import SmartLink from '../../../../components/atoms/SmartLink'
import SiteLogo from '../../../../components/molecules/SiteLogo'
import Alert from './Alert'

import { ReactComponent as DiscordIcon } from '@media/icons/discord.svg'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as UpIcon } from '@media/icons/up.svg'
import { ReactComponent as DownIcon } from '@media/icons/down.svg'
import { ReactComponent as StudioIcon } from '@media/icons/studio.svg'
import { ReactComponent as ExternalLinkIcon } from '@media/icons/external-link.svg'

import {
  HamburgerMenu,
  HamburgerButton,
  useHamburgerMenu
} from '../../../../components/molecules/HamburgerMenu'

import * as styles from './styles.module.css'
import usePopup from '../../../../utils/hooks/usePopup'
import onSelectKey from '../../../../utils/onSelectKey'

interface IHeaderProps {
  isMain?: boolean
}
interface IOtherToolsItem {
  title: string
  titleIcon?: JSX.Element
  icon: JSX.Element
  description: string
  href: string
}
interface IOtherToolsPopupProps {
  list: Array<IOtherToolsItem>
  isOpen: boolean
}

const socialLinkDefinitions = [
  {
    url: 'https://github.com/iterative/cml',
    icon: <GithubIcon width="16" height="16" />,
    title: 'CML GitHub repo'
  },
  {
    url: 'https://cml.dev/chat',
    icon: <DiscordIcon className="small-svg" />,
    title: 'DVC Discord chat'
  }
]

const primaryNavItems = [
  {
    label: 'Use Cases',
    href: '/#use-cases'
  },
  {
    label: 'Docs',
    href: '/doc'
  },
  {
    label: 'Blog',
    href: 'https://iterative.ai/blog'
  }
]

const otherToolsItems: Array<IOtherToolsItem> = [
  {
    title: 'DataChain',
    icon: <span>🔗</span>,
    description:
      'Wrangle unstructured data in Python using AI helpers at scale',
    href: 'https://github.com/iterative/datachain'
  },
  {
    title: 'DataChain Studio',
    icon: <StudioIcon width="24" height="24" />,
    description: 'Track experiments and share insights from ML projects',
    href: 'https://studio.iterative.ai/'
  }
]

const OtherToolsPopup: React.FC<IOtherToolsPopupProps> = ({ list, isOpen }) => {
  return (
    <Flex
      variant="layout.Header.Nav.OtherToolsPopup"
      sx={isOpen ? { variant: 'layout.Header.Nav.OtherToolsPopup.Open' } : {}}
    >
      {list.map(
        ({ title, icon, description, href, titleIcon: TitleIcon }, i) => (
          <SmartLink
            href={href}
            key={i}
            variant="layout.Header.Nav.OtherToolsPopup.Link"
          >
            <Box variant="layout.Header.Nav.OtherToolsPopup.Link.Icon">
              {icon}
            </Box>
            <Box as="h2" variant="layout.Header.Nav.OtherToolsPopup.Link.Title">
              {title}
              {TitleIcon && TitleIcon}
              {href.match(/^https?:\/\//) && (
                <ExternalLinkIcon width="16" height="16" />
              )}
            </Box>
            <Box
              as="p"
              variant="layout.Header.Nav.OtherToolsPopup.Link.Description"
            >
              {description}
            </Box>
          </SmartLink>
        )
      )}
    </Flex>
  )
}

const Header: React.FC<IHeaderProps> = ({ isMain }) => {
  const { opened, handleToggle, handleItemClick } = useHamburgerMenu()

  const collapsed = opened

  const installPopup = usePopup()
  const otherToolsPopup = usePopup()

  return (
    <>
      <Box
        as="header"
        variant="layout.Header"
        className={isMain ? '' : styles.headerForDoc}
        sx={
          isMain
            ? { backgroundColor: 'transparent' }
            : { position: 'fixed', width: '100%' }
        }
      >
        {isMain && <Alert />}
        <Container variant="layout.Header.Inner">
          <Box as="nav" variant="layout.Header.Nav">
            <SiteLogo variant="layout.Header.Nav.Logo" />
            <SmartLink
              href="https://iterative.ai/"
              variant="layout.Header.Nav.CompanyLabel"
            >
              {' '}
              by iterative.ai
            </SmartLink>
            <Flex variant="layout.Header.Nav.SocialIcons">
              {socialLinkDefinitions.map(({ url, icon, title }, i) => (
                <SmartLink
                  key={i}
                  href={url}
                  variant="layout.Header.Nav.Link"
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
              ))}
            </Flex>
            <Flex variant="layout.Header.Nav.LinksWrapper">
              {primaryNavItems.map(({ label, href }, i) => (
                <SmartLink href={href} variant="layout.Header.Nav.Link" key={i}>
                  {label}
                </SmartLink>
              ))}
              <Box
                ref={installPopup?.containerEl}
                sx={{ position: ['static', 'relative'] }}
                onMouseEnter={installPopup.open}
                onMouseLeave={installPopup.close}
              >
                <Button
                  onPointerUp={installPopup.toggle}
                  onKeyUp={onSelectKey(installPopup.toggle)}
                  variant="layout.Header.Nav.NavButton"
                  sx={
                    installPopup.isOpen
                      ? { variant: 'layout.Header.Nav.NavButton.Active' }
                      : {}
                  }
                >
                  Install
                </Button>
                <InstallPopup
                  onClose={installPopup.close}
                  isOpen={installPopup.isOpen}
                />
              </Box>
              <Box
                variant="layout.Header.Nav.OtherTools"
                ref={otherToolsPopup.containerEl}
                sx={{ position: 'relative' }}
                onMouseEnter={otherToolsPopup.open}
                onMouseLeave={otherToolsPopup.close}
              >
                <Button
                  onPointerUp={otherToolsPopup.toggle}
                  onKeyUp={onSelectKey(otherToolsPopup.toggle)}
                  variant="layout.Header.Nav.NavButton"
                  sx={
                    otherToolsPopup.isOpen
                      ? { variant: 'layout.Header.Nav.NavButton.Active' }
                      : {}
                  }
                >
                  More Tools
                  <Box
                    variant="layout.Header.Nav.NavButton.Icon"
                    sx={
                      otherToolsPopup.isOpen
                        ? { display: 'none' }
                        : { display: 'flex' }
                    }
                    as="span"
                  >
                    <DownIcon width="14" height="14" />
                  </Box>
                  <Box
                    variant="layout.Header.Nav.NavButton.Icon"
                    sx={
                      otherToolsPopup.isOpen
                        ? { display: 'flex' }
                        : { display: 'none' }
                    }
                    as="span"
                  >
                    <UpIcon width="14" height="14" />
                  </Box>
                </Button>
                <OtherToolsPopup
                  isOpen={otherToolsPopup.isOpen}
                  list={otherToolsItems}
                />
              </Box>
            </Flex>
          </Box>
        </Container>
        {!isMain && (
          <>
            <HamburgerButton
              opened={opened}
              collapsed={collapsed}
              handleClick={handleToggle}
            />
            <HamburgerMenu
              opened={opened}
              collapsed={collapsed}
              handleToggle={handleToggle}
              handleItemClick={handleItemClick}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default Header
