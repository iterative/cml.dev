import React, { useMemo } from "react"
import { Box } from "@theme-ui/components"
import { clickOnKeyPress } from "utils/handlers"
/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */

export const HiddenRadioControl = ({
  defaultChecked,
  inputName = "tab",
  id,
}) => (
  <Box
    as="input"
    variant="styles.Tabs.RadioInput"
    aria-label="Hidden tab control"
    type="radio"
    role="tab"
    defaultChecked={defaultChecked}
    name={inputName}
    id={id}
    tabindex={-1}
    aria-hidden
    hidden
  />
)

export function useRadioTabs(inputContent, idPrefix = "tabs") {
  return useMemo(() => {
    const [result, hasChecked] = inputContent.reduce(
      ([result, hasChecked], item, i) => {
        return [
          result.concat({
            ...item,
            id: `${idPrefix}-tab-${i}`,
          }),
          hasChecked || item.checked,
        ]
      },
      [[], false]
    )
    if (!hasChecked) result[0].checked = true
    return result
  }, [inputContent, idPrefix])
}

export const Tabs = ({ children, sx }) => {
  return (
    <Box as="form" variant="styles.Tabs" sx={{
      "code": {
        display: "block",
        width: "100%",
        flex: "1 0",
      },
      ...sx
    }}>
      {children}
    </Box>
  )
}

export const JSONTabs = ({ content, name: idPrefix = "tabs", sx }) => {
  // If no child tab is checked, set the first one to be so.
  const tabs = useRadioTabs(content)
  return (
    <Tabs sx={sx}>
      {tabs.map(({ name, content, checked, id }, i) => (
        <Tab name={name} defaultChecked={checked} id={id} key={i}>
          {content}
        </Tab>
      ))}
    </Tabs>
  )
}

export const Tab = ({
  children,

  name,
  defaultChecked,
  inputName,
  checked,
  id,
}) => (
  <>
    <HiddenRadioControl
      inputName={inputName}
      defaultChecked={defaultChecked}
      checked={checked}
      id={id}
    />
    <label htmlFor={id} tabIndex={0} onKeyPress={clickOnKeyPress}>
      {name}
    </label>
    <section>{children}</section>
  </>
)
