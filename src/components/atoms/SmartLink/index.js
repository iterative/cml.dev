import React from "react"
import { Link as ThemedLink } from "@theme-ui/components"
import { Link as GatsbyLink } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const SmartLink = ({ href, ...props }) => {
  const isExternal = href.match(/^https?:\/\//)
  return isExternal ? (
    <ThemedLink
      as={OutboundLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ) : (
    <ThemedLink as={GatsbyLink} to={href} {...props} />
  )
}

export default SmartLink
