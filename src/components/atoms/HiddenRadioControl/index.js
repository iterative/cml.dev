import React from 'react'
import { Box } from '@theme-ui/components'

const HiddenRadioControl = ({
  defaultChecked,
  checked,
  inputName = 'tab',
  id,
  ...props
}) => {
  return (
    <Box
      as="input"
      variant="styles.Tabs.RadioInput"
      aria-hidden
      aria-label="Hidden radio control"
      type="radio"
      defaultChecked={defaultChecked}
      checked={checked}
      name={inputName}
      id={id}
      tabindex={-1}
      hidden
      {...props}
    />
  )
}

export default HiddenRadioControl
