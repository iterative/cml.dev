import React, { useEffect, useRef } from 'react'
import useRehydrated from '../../../utils/use-rehydrated'
import { useMode } from '../../organisms/SwitchableMode/Provider'
import { Box } from '@theme-ui/components'

const Video = ({
  sx = {},
  src,
  mode,
  controls = false,
  playsInline = true,
  autoPlay = !controls,
  muted = autoPlay,
  variant = 'styles.Video',
  loop,
  loading = 'lazy',
  ...rest
}) => {
  const { currentMode: contextMode } = useMode()
  const videoRef = useRef()
  const videoElement = videoRef.current

  const rehydrated = useRehydrated()

  useEffect(() => {
    if (mode && videoElement) {
      if (contextMode !== mode) {
        videoElement.pause()
      } else if (autoPlay) {
        videoElement.play()
      }
    }
  }, [rehydrated, mode, contextMode, videoElement, autoPlay])

  return (
    <Box
      variant={variant}
      sx={{
        position: 'relative',
        ...sx
      }}
      {...rest}
    >
      <Box
        as="video"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline={playsInline}
        controls={controls}
        muted={muted}
        src={src}
        loop={loop}
        loading={loading}
      />
    </Box>
  )
}

export default Video
