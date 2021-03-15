import React, { useRef } from "react"
import { Flex, Heading, Button, Text } from "@theme-ui/components"
import CopySvg from "media/icons/copy.svg"

function InstallPopup({ isOpen, onClose }) {
  const installCodeEl = useRef(null)

  function copyInstallCode(e) {
    e.preventDefault()
    const pre = installCodeEl.current
    if (!pre || !navigator.clipboard) return
    navigator.clipboard.writeText(pre.textContent)
  }

  return (
    <Flex
      variant="layout.Header.Nav.InstallPopup"
      sx={isOpen ? { variant: "layout.Header.Nav.InstallPopup.Open" } : {}}
    >
      <Heading as="h2">Install CML as a package</Heading>
      <Flex ref={installCodeEl} as="code">
        npm i -g @dvcorg/cml
        <Button onClick={copyInstallCode}>
          <CopySvg />
        </Button>
      </Flex>
      <Text variant="layout.Header.Nav.InstallPopup.Text" as="p">
        More in documentation
      </Text>
      <Button onClick={onClose} variant="copy">
        OK
      </Button>
    </Flex>
  )
}

export default InstallPopup
