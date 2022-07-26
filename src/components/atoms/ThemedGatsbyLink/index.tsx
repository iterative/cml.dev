import React, { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as ThemedLink } from '@theme-ui/components'

interface IThemedGatsbyLinkProps {
  children: ReactNode
  to: string
  variant: string
  ariaLabel?: string
}

const ThemedGatsbyLink: React.FC<IThemedGatsbyLinkProps> = props => {
  return <ThemedLink as={GatsbyLink} {...props} />
}

export default ThemedGatsbyLink
