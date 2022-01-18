import React from 'react'
import GatsbyLink from '../../atoms/ThemedGatsbyLink'

import { Box } from '@theme-ui/components'

import { ReactComponent as CmlText } from '@media/cml-text.svg'
import cmlIcon from '@media/icons/cml.svg'

interface ISiteLogo {
  variant?: string
}

const SiteLogo: React.FC<ISiteLogo> = ({ variant = 'layout.SiteLogo' }) => (
  <GatsbyLink to="/" variant={variant} ariaLabel="Home">
    <Box as="span" sx={{ backgroundImage: `url("${cmlIcon}")` }} />
    <CmlText width="46" height="16" />
  </GatsbyLink>
)

export default SiteLogo
