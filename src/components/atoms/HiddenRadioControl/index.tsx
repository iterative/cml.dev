import React from 'react'
import { Box } from '@theme-ui/components'

type IHiddenRadioControlProps = {
  className?: string
  sx?: any
  children?: React.ReactNode
  defaultChecked?: boolean,
  inputName?: string,
  checked?: boolean,
  id?: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const HiddenRadioControl: React.FC<IHiddenRadioControlProps> = ({
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
