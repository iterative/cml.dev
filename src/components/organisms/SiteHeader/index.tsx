import React, { useRef, useState } from "react"
import Link from "../../atoms/ThemedGatsbyLink"
import { Flex, Box, Container, Button } from "@theme-ui/components"
import InstallPopup from "../../molecules/InstallPopup"
import SmartLink from "../../atoms/SmartLink"


import { ReactComponent as SiteLogo } from '@media/site-logo.svg'
import { ReactComponent as UpIcon } from '@media/icons/up.svg'
import { ReactComponent as DownIcon } from '@media/icons/down.svg'
import { ReactComponent as CmlIcon } from '@media/icons/cml.svg'
import { ReactComponent as DvcIcon } from '@media/icons/dvc.svg'
import { ReactComponent as StudioIcon } from '@media/icons/studio.svg'
import { ReactComponent as ExternalLinkIcon } from '@media/icons/external-link.svg'

const navItems = [
  {
    label: "Use Cases",
    href: "/#use-cases",
  },
  {
    label: "Docs",
    href: "/doc",
  },
  {
    label: "GitHub",
    href: "https://github.com/iterative/cml",
  },
]

const otherToolsItems = [
  {
    title: "Studio",
    icon: <StudioIcon width="24" height="24" />,
    description: "Track experiments and share insights from ML projects",
    href: "https://studio.iterative.ai/",
  },
  {
    title: "DVC",
    icon: <DvcIcon width="24" height="24" />,
    description: "Open-source version control system for ML projects",
    href: "https://dvc.org/",
  },
  {
    title: "CML",
    icon: <CmlIcon width="24" height="24" />,
    description: "Open-source CI/CD for ML projects",
    href: "/",
  },
]

const OtherToolsPopup = ({ list, isOpen }: { list: Array<any>, isOpen: boolean }) => {
  return (
    <Flex
      variant="layout.Header.Nav.OtherToolsPopup"
      sx={isOpen ? { variant: "layout.Header.Nav.OtherToolsPopup.Open" } : {}}
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
            <ExternalLinkIcon width="16" height="16" />
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

function Header({ isMain = false }) {
  const [isInstallPopupOpen, setIsInstallPopupOpen] = useState(false)
  const [isOtherToolsPopupOpen, setIsOtherToolsPopupOpen] = useState(false)
  const installPopupContainerEl = useRef(null)
  const otherToolsPopupContainerEl = useRef(null)

  function handlePageKeyup(e: any) {
    if (e.key === "Escape") {
      closeAllPopups()
    }
  }

  function handlePageClick(e: any) {
    if (
      !installPopupContainerEl.current.contains(e.target) &&
      !otherToolsPopupContainerEl.current.contains(e.target)
    ) {
      closeAllPopups()
    }
  }

  function openInstallPopup() {
    document.addEventListener("click", handlePageClick)
    document.addEventListener("keyup", handlePageKeyup)
    setIsInstallPopupOpen(true)
  }

  function openOtherToolsPopup() {
    document.addEventListener("click", handlePageClick)
    document.addEventListener("keyup", handlePageKeyup)
    setIsOtherToolsPopupOpen(true)
  }

  function closeAllPopups() {
    setIsInstallPopupOpen(false)
    setIsOtherToolsPopupOpen(false)

    document.removeEventListener("click", handlePageClick)
    document.removeEventListener("keyup", handlePageKeyup)
  }

  function toggleInstallPopup() {
    setIsOtherToolsPopupOpen(false)
    if (isInstallPopupOpen) {
      closeAllPopups()
    } else {
      openInstallPopup()
    }
  }

  function toggleOtherToolsPopup() {
    setIsInstallPopupOpen(false)
    if (isOtherToolsPopupOpen) {
      closeAllPopups()
    } else {
      openOtherToolsPopup()
    }
  }

  return (
    <Box
      as="header"
      variant="layout.Header"
      sx={isMain ? { backgroundColor: "transparent" } : { position: 'sticky', top: 0, zIndex: 1 }}
    >
      <Container variant="layout.Header.Inner" sx={isMain ? {} : { height: '90px' }}>
        <Box as="nav" variant="layout.Header.Nav" id="header-nav">
          <Link to="/" variant="layout.Header.Nav.Logo">
            <SiteLogo />
          </Link>
          <SmartLink
            href="https://iterative.ai/"
            variant="layout.Header.Nav.CompanyLabel"
          >
            {" "}
            by iterative.ai
          </SmartLink>
          <Box
            variant="layout.Header.Nav.OtherTools"
            ref={otherToolsPopupContainerEl}
            sx={{ position: "relative" }}
          >
            <Button
              onClick={toggleOtherToolsPopup}
              variant="layout.Header.Nav.NavButton"
              sx={
                isOtherToolsPopupOpen
                  ? { variant: "layout.Header.Nav.NavButton.Active" }
                  : {}
              }
            >
              Other Tools
              <Box
                variant="layout.Header.Nav.NavButton.Icon"
                sx={
                  isOtherToolsPopupOpen
                    ? { display: "none" }
                    : { display: "flex" }
                }
                as="span"
              >
                <DownIcon width="14" height="14" />
              </Box>
              <Box
                variant="layout.Header.Nav.NavButton.Icon"
                sx={
                  isOtherToolsPopupOpen
                    ? { display: "flex" }
                    : { display: "none" }
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
          <Flex variant="layout.Header.Nav.RightWrapper">
            {navItems.map(({ label, href }, i) => (
              <SmartLink href={href} variant="layout.Header.Nav.Link" key={i}>
                {label}
              </SmartLink>
            ))}
            <Box ref={installPopupContainerEl} sx={{ position: "relative" }}>
              <Button
                onClick={toggleInstallPopup}
                variant="layout.Header.Nav.NavButton"
                sx={
                  isInstallPopupOpen
                    ? { variant: "layout.Header.Nav.NavButton.Active" }
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
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
