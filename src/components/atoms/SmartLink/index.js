import React from 'react'
import { Link as ThemedLink } from '@theme-ui/components'
import { Link as GatsbyLink } from 'gatsby'

const SmartLink = ({ href, ...props }) => {
  const isExternal = href.match(/^https?:\/\//)
  return isExternal ? (
    <ThemedLink
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
