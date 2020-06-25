import React from "react"
import Video from "../"

const LandingVideo = props => (
  <Video
    variant="styles.LandingVideo"
    controls={false}
    autoPlay={true}
    repeat={true}
    {...props}
  />
)

export default LandingVideo
