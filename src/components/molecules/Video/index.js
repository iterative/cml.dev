import React, { useContext, useEffect, useRef } from "react"
import { ModeContext } from "components/organisms/SwitchableMode/Provider"
import { Box } from "@theme-ui/components"

const Video = ({
  sx = {},
  src,
  mode,
  controls = false,
  playsinline = true,
  autoPlay = !controls,
  variant = "styles.Video",
  ...rest
}) => {
  const contextMode = useContext(ModeContext)
  const videoRef = useRef()
  const videoElement = videoRef.current

  useEffect(() => {
    if (mode && videoElement) {
      if (contextMode !== mode) {
        videoElement.pause()
      } else if (autoPlay) {
        videoElement.play()
      }
    }
  }, [mode, contextMode, videoElement, autoPlay])
  return (
    <Box
      variant={variant}
      sx={{
        position: "relative",
        ...sx,
      }}
      {...rest}
    >
      <Box
        as="video"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        ref={videoRef}
        autoPlay={autoPlay}
        playsinline={playsinline}
        controls={controls}
        src={src}
      />
    </Box>
  )
}

export default Video
