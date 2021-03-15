import React, { useRef, useState } from "react"
import Link from "components/atoms/ThemedGatsbyLink"
import { Box, Container, Button } from "@theme-ui/components"
import SmartLink from "components/atoms/SmartLink"
import SiteLogo from "components/atoms/SiteLogo"
import InstallPopup from "components/atoms/InstallPopup"

const navItems = [
  {
    label: "Use Cases",
    href: "#use-cases",
  },
  {
    label: "Docs",
    href: "https://dvc.org/doc/cml",
  },
  {
    label: "GitHub",
    href: "https://github.com/iterative/cml",
  },
]

function Header() {
  const [isInstallPopupOpen, setIsInstallPopupOpen] = useState(false)
  const installBtnPopupContainerEl = useRef(null)

  function handlePageClick(e) {
    if (!installBtnPopupContainerEl.current.contains(e.target)) {
      closeInstallPopup()
    }
  }

  function handlePageKeyup(e) {
    if (e.key === "Escape") {
      closeInstallPopup()
    }
  }

  function openInstallPopup() {
    document.addEventListener("click", handlePageClick)
    document.addEventListener("keyup", handlePageKeyup)
    setIsInstallPopupOpen(true)
  }

  function closeInstallPopup() {
    setIsInstallPopupOpen(false)
    document.removeEventListener("click", handlePageClick)
    document.removeEventListener("keyup", handlePageKeyup)
  }

  function toggleInstallPopup() {
    if (isInstallPopupOpen) {
      closeInstallPopup()
    } else {
      openInstallPopup()
    }
  }

  return (
    <Box as="header" variant="layout.Header">
      <Container variant="layout.Header.Inner">
        <Link to="/" variant="layout.Header.Logo">
          <SiteLogo />
        </Link>
        <Box as="nav" variant="layout.Header.Nav" id="header-nav">
          {navItems.map(({ label, href }, i) => (
            <SmartLink href={href} variant="layout.Header.Nav.Link" key={i}>
              {label}
            </SmartLink>
          ))}
          <Box ref={installBtnPopupContainerEl} sx={{ position: "relative" }}>
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
              onClose={closeInstallPopup}
              isOpen={isInstallPopupOpen}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
