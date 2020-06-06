import React, { useContext, useEffect, useRef } from "react"
import { ModeContext } from "components/organisms/SwitchableMode/Provider"
import { Button, Box, Container, Link } from "@theme-ui/components"
import { JSONTabs } from "components/organisms/Tabs"

import Switchable from "components/organisms/SwitchableMode/Switchable"
import Switch from "components/organisms/SwitchableMode/Switch"

const Tooltip = ({ sx = {}, as = "span", className, contents, children }) => {
  return (
    <Box
      as={as}
      variant="styles.Tooltip"
      className={className}
      sx={{
        "& aside": {
          display: "hidden",
        },
        "&:focus": {
          "& aside": {
            display: "block",
          },
        },
      }}
    >
      {children}
      <aside>{contents}</aside>
    </Box>
  )
}

const FullWidthBox = ({ originalType, children, ...props }) => {
  return (
    <Box
      variant="styles.FullWidthBox"
      sx={{ backgroundColor: "green" }}
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  )
}

FullWidthBox.isFullWidth = true

const Video = ({
  sx = {},
  mode,
  autoplay,
  playsinline = true,
  controls = true,
  ...props
}) => {
  const contextMode = useContext(ModeContext)
  const videoRef = useRef()
  const videoElement = videoRef.current
  useEffect(() => {
    if (mode) {
      if (contextMode !== mode && videoElement) {
        videoElement.pause()
      }
    }
  }, [mode, contextMode, videoElement])
  return (
    <Box
      as="video"
      ref={videoRef}
      autoplay={autoplay}
      playsinline={playsinline}
      controls={controls}
      sx={{
        my: 4,
        maxWidth: "100%",
        ...sx,
      }}
      {...props}
    />
  )
}

export default {
  JSONTabs,
  Tooltip,
  Video,

  Switchable,
  Switch,

  Container,
  Button,
  Link,
  Box,

  FullWidthBox,
}
