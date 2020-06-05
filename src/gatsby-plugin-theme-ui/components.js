import React, { useContext, useEffect, useRef } from "react"
import { ModeContext } from "components/organisms/SwitchableMode/Provider"
import { Box } from "@theme-ui/components"

export default {
  Video: ({
    sx = {},
    mode,
    autoplay,
    playsinline=true,
    controls=true,
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
  },
}
