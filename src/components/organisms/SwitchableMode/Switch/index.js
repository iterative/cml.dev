import React from "react"
import { Box } from "@theme-ui/components"
import msx from "../styleHelpers.js"
import { defaultIdPrefix } from "../common.js"

const ModeSwitchLabel = ({
  idPrefix,
  mode,
  variant,
  sx,
  className,
  children,
}) => (
  <Box
    as="label"
    htmlFor={idPrefix + mode}
    variant={`${variant}.Label`}
    className={className}
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
  left = "GitLab",
  leftMode = "gitlab",
  right = "GitHub",
  rightMode = "github",
  variant = "switches.primary",
  sx,
  className,
}) => {
  return (
    <Box
      variant={variant}
      className={className}
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
