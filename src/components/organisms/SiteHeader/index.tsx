import React, { useRef, useState, useEffect } from 'react'
import { Flex, Box, Container, Button } from '@theme-ui/components'
import InstallPopup from '../../molecules/InstallPopup'
import SmartLink from '../../atoms/SmartLink'
import SiteLogo from '../../molecules/SiteLogo'

import { ReactComponent as DiscordIcon } from '@media/icons/discord.svg'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as UpIcon } from '@media/icons/up.svg'
import { ReactComponent as DownIcon } from '@media/icons/down.svg'
import { ReactComponent as CmlIcon } from '@media/icons/cml_icon-color--square_vector.svg'
import { ReactComponent as DvcIcon } from '@media/icons/dvc_icon-color--square_vector.svg'
import { ReactComponent as StudioIcon } from '@media/icons/studio_icon-color--square_vector.svg'
import { ReactComponent as ExternalLinkIcon } from '@media/icons/external-link.svg'

import {
  HamburgerMenu,
  HamburgerButton,
  useHamburgerMenu
} from '../../molecules/HamburgerMenu'

import styles from './styles.module.css'

interface IHeaderProps {
  isMain?: boolean
}
interface IOtherToolsItem {
  title: string
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
    url: 'https://www.dvc.org/chat',
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
  }
]

const otherToolsItems: Array<IOtherToolsItem> = [
  {
    title: 'Studio',
    icon: <StudioIcon width="24" height="24" />,
    description: 'Track experiments and share insights from ML projects',
    href: 'https://studio.iterative.ai/'
  },
  {
    title: 'DVC',
    icon: <DvcIcon width="24" height="24" />,
    description: 'Open-source version control system for ML projects',
    href: 'https://dvc.org/'
  },
  {
    title: 'CML',
    icon: <CmlIcon width="24" height="24" />,
    description: 'Open-source CI/CD for ML projects',
    href: '/'
  }
]

const OtherToolsPopup: React.FC<IOtherToolsPopupProps> = ({ list, isOpen }) => {
  return (
    <Flex
      variant="layout.Header.Nav.OtherToolsPopup"
      sx={isOpen ? { variant: 'layout.Header.Nav.OtherToolsPopup.Open' } : {}}
    >
      {list.map(({ title, icon, description, href }, i) => (
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
      ))}
    </Flex>
  )
}

const Header: React.FC<IHeaderProps> = ({ isMain }) => {
  const { opened, handleToggle, handleItemClick } = useHamburgerMenu()

  const collapsed = opened
  const [isInstallPopupOpen, setIsInstallPopupOpen] = useState(false)
  const [isOtherToolsPopupOpen, setIsOtherToolsPopupOpen] = useState(false)
  const installPopupContainerEl = useRef<HTMLDivElement>(null)
  const otherToolsPopupContainerEl = useRef<HTMLDivElement>(null)

  const closeAllPopups = (): void => {
    setIsInstallPopupOpen(false)
    setIsOtherToolsPopupOpen(false)
  }

  const handlePageClick = (event: MouseEvent): void => {
    if (
      event.target instanceof Element &&
      !installPopupContainerEl?.current?.contains(event.target) &&
      !otherToolsPopupContainerEl?.current?.contains(event.target)
    ) {
      closeAllPopups()
    }
  }

  const handlePageKeyup = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeAllPopups()
    }
  }

  const openInstallPopup = (): void => {
    document.addEventListener('click', handlePageClick)
    document.addEventListener('keyup', handlePageKeyup)
    setIsInstallPopupOpen(true)
  }

  const openOtherToolsPopup = (): void => {
    document.addEventListener('click', handlePageClick)
    document.addEventListener('keyup', handlePageKeyup)
    setIsOtherToolsPopupOpen(true)
  }

  const toggleInstallPopup = (): void => {
    setIsOtherToolsPopupOpen(false)
    if (isInstallPopupOpen) {
      closeAllPopups()
    } else {
      openInstallPopup()
    }
  }

  const toggleOtherToolsPopup = (): void => {
    setIsInstallPopupOpen(false)
    if (isOtherToolsPopupOpen) {
      closeAllPopups()
    } else {
      openOtherToolsPopup()
    }
  }

  useEffect(() => {
    if (!isInstallPopupOpen && !isOtherToolsPopupOpen) {
      document.removeEventListener('click', handlePageClick)
      document.removeEventListener('keyup', handlePageKeyup)
    }
  }, [isInstallPopupOpen, isOtherToolsPopupOpen])

  return (
    <>
      <Box
        as="header"
        variant="layout.Header"
        className={isMain ? '' : styles.headerForDoc}
        sx={
          isMain ? { backgroundColor: 'transparent' } : { position: 'sticky' }
        }
      >
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
                ref={installPopupContainerEl}
                sx={{ position: ['static', 'relative'] }}
              >
                <Button
                  onClick={toggleInstallPopup}
                  variant="layout.Header.Nav.NavButton"
                  sx={
                    isInstallPopupOpen
                      ? { variant: 'layout.Header.Nav.NavButton.Active' }
                      : {}
                  }
                >
                  Install
                </Button>
                <InstallPopup
                  onClose={closeAllPopups}
                  isOpen={isInstallPopupOpen}
                />
              </Box>
              <Box
                variant="layout.Header.Nav.OtherTools"
                ref={otherToolsPopupContainerEl}
                sx={{ position: 'relative' }}
              >
                <Button
                  onClick={toggleOtherToolsPopup}
                  variant="layout.Header.Nav.NavButton"
                  sx={
                    isOtherToolsPopupOpen
                      ? { variant: 'layout.Header.Nav.NavButton.Active' }
                      : {}
                  }
                >
                  Other Tools
                  <Box
                    variant="layout.Header.Nav.NavButton.Icon"
                    sx={
                      isOtherToolsPopupOpen
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
                      isOtherToolsPopupOpen
                        ? { display: 'flex' }
                        : { display: 'none' }
                    }
                    as="span"
                  >
                    <UpIcon width="14" height="14" />
                  </Box>
                </Button>
                <OtherToolsPopup
                  isOpen={isOtherToolsPopupOpen}
                  list={otherToolsItems}
                />
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
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
    </>
  )
}

export default Header
