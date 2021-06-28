import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as ThemedLink } from '@theme-ui/components'

const ThemedGatsbyLink: React.FC = props => {
  return <ThemedLink as={GatsbyLink} {...props} />
}

export default ThemedGatsbyLink
