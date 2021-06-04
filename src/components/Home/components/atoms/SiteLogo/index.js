import React from 'react'
import { ReactComponent as LogoSVG } from '../../../../../media/site-logo.svg'

function SiteLogo({ ...props }) {
  return <LogoSVG alt="CML" title="CML" {...props} />
}

export default SiteLogo
