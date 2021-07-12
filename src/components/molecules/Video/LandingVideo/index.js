import React from 'react'
import Video from '..'

const LandingVideo = props => (
  <Video
    variant="styles.LandingVideo"
    controls={true}
    autoPlay={true}
    loop={true}
    playsInline={true}
    {...props}
  />
)

export default LandingVideo
