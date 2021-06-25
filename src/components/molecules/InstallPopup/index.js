import React, { useRef, useState } from 'react'
import { Flex, Heading, Button, Text } from '@theme-ui/components'
import SmartLink from '../../atoms/SmartLink'
import { ReactComponent as CopySvg } from "@media/icons/copy.svg"

function InstallPopup({ isOpen, onClose }) {
  const installCodeEl = useRef(null)
  const [isCopiedTextActive, setIsCopiedTextActive] = useState(false)

  function copyInstallCode(e) {
    e.preventDefault()
    const pre = installCodeEl.current
    if (!pre || !navigator.clipboard) return
    navigator.clipboard.writeText(pre.textContent)

    setIsCopiedTextActive(true)
    setTimeout(() => {
      setIsCopiedTextActive(false)
    }, 3000)
  }

  return (
    <Flex
      variant="layout.Header.Nav.InstallPopup"
      sx={isOpen ? { variant: 'layout.Header.Nav.InstallPopup.Open' } : {}}
    >
      <Heading as="h2">Install CML as a package</Heading>
      <Text
        variant="layout.Header.Nav.InstallPopup.CopiedText"
        as="p"
        sx={
          isCopiedTextActive
            ? { variant: 'layout.Header.Nav.InstallPopup.CopiedText.Active' }
            : {}
        }
      >
        Copied!
      </Text>
      <Flex as="code">
        <span ref={installCodeEl}>npm i -g @dvcorg/cml</span>
        <Button
          variant="layout.Header.Nav.InstallPopup.CopyBtn"
          onClick={copyInstallCode}
        >
          <CopySvg />
          <Text as="p">Copy Code</Text>
        </Button>
      </Flex>
      <SmartLink
        variant="layout.Header.Nav.InstallPopup.Link"
        href="https://github.com/iterative/cml#install-cml-as-a-package"
      >
        More in documentation
      </SmartLink>
      <Button variant="layout.Header.Nav.InstallPopup.OkBtn" onClick={onClose}>
        OK
      </Button>
    </Flex>
  )
}

export default InstallPopup
