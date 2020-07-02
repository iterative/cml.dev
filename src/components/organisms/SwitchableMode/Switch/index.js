import React from "react"
import { Box } from "@theme-ui/components"
import msx from "../styleHelpers.js"
import { defaultIdPrefix } from "../common.js"
import { clickOnKeyPress } from "utils/handlers"

const ModeSwitchLabel = ({ idPrefix, mode, variant, className, children }) => (
  <Box
    as="label"
    htmlFor={idPrefix + mode}
    variant={`${variant}.Label`}
    className={className}
    tabIndex={0}
    sx={msx({
      mode,
      idPrefix,
      variant: `${variant}.Label.Active`,
    })}
  >
    {children}
  </Box>
)

const ModeSwitch = ({
  idPrefix = defaultIdPrefix,
  variant = "switches.primary",
  left = "GitLab",
  leftMode = "gitlab",
  right = "GitHub",
  rightMode = "github",
  className,
  sx,
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
        modes: {
          gitlab: {
            variant: `switches.Base.Left`,
          },
          github: {
            variant: `switches.Base.Right`,
          },
        },
      })}
    >
      <ModeSwitchLabel mode={leftMode} variant={variant} idPrefix={idPrefix}>
        {left}
      </ModeSwitchLabel>
      <ModeSwitchLabel mode={rightMode} variant={variant} idPrefix={idPrefix}>
        {right}
      </ModeSwitchLabel>
    </Box>
  )
}

export default ModeSwitch
