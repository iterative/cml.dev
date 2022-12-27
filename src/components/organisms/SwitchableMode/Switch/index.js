import React from 'react'
import { Box } from '@theme-ui/components'
import msx from '../styleHelpers.js'
import { defaultIdPrefix } from '../common.js'
import { clickOnKeyPress } from '../../../../utils/handlers'
import { useMode } from '../Provider/index.js'

const ModeSwitchLabel = ({ idPrefix, mode, variant, className, children }) => {
  const { updateMode } = useMode()
  return (
    <Box
      as="label"
      htmlFor={idPrefix + mode}
      variant={`${variant}.Label`}
      className={className}
      tabIndex={0}
      onClick={() => updateMode(mode)}
      sx={msx({
        mode,
        idPrefix,
        variant: `${variant}.Label.Active`
      })}
    >
      {children}
    </Box>
  )
}

const ModeSwitch = ({
  idPrefix = defaultIdPrefix,
  variant = 'switches.primary',
  left = 'GitLab',
  leftMode = 'gitlab',
  center = 'GitHub',
  centerMode = 'github',
  right = 'Bitbucket',
  rightMode = 'bitbucket',
  className = '',
  sx
}) => {
  return (
    <Box
      variant={variant}
      className={className}
      onMouseDown={e => e.preventDefault}
      onKeyPress={clickOnKeyPress}
      sx={msx({
        ...sx,
        idPrefix,
        // TODO: duplicated in cml.dev/src/components/organisms/SwitchableMode/common.js
        modes: {
          gitlab: {
            variant: `switches.Base.Left`
          },
          github: {
            variant: `switches.Base.Center`
          },
          bitbucket: {
            variant: `switches.Base.Right`
          }
        }
      })}
    >
      <ModeSwitchLabel mode={leftMode} variant={variant} idPrefix={idPrefix}>
        {left}
      </ModeSwitchLabel>

      <ModeSwitchLabel mode={centerMode} variant={variant} idPrefix={idPrefix}>
        {center}
      </ModeSwitchLabel>

      <ModeSwitchLabel mode={rightMode} variant={variant} idPrefix={idPrefix}>
        {right}
      </ModeSwitchLabel>
    </Box>
  )
}

export default ModeSwitch
