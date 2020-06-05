import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as ThemedLink } from "@theme-ui/components"

function ThemedGatsbyLink(props) {
  return <ThemedLink as={GatsbyLink} {...props} />
}

export default ThemedGatsbyLink
