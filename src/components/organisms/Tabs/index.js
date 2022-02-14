import React, { useMemo } from 'react'
import { Box } from '@theme-ui/components'
import { clickOnKeyPress } from '../../../utils/handlers'
import HiddenRadioControl from '../../atoms/HiddenRadioControl'
/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */

export function useRadioTabs(inputContent, idPrefix = 'tabs') {
  return useMemo(() => {
    const [result, hasChecked] = inputContent.reduce(
      ([result, hasChecked], item, i) => {
        return [
          result.concat({
            ...item,
            id: `${idPrefix}-tab-${i}`
          }),
          hasChecked || item.checked
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
    <Box
      as="form"
      variant="styles.Tabs"
      sx={{
        code: {
          display: 'block',
          width: '100%',
          flex: '1 0'
        },
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export const JSONTabs = ({ content, name: idPrefix = 'tabs', sx }) => {
  // If no child tab is checked, set the first one to be so.
  const tabs = useRadioTabs(content, idPrefix)

  const [radioElements, labelElements, contentElements] = useMemo(
    () =>
      tabs.reduce(
        (
          [radioElements, labelElements, contentElements],
          { name, content, checked, id },
          i
        ) => {
          return [
            [
              ...radioElements,
              <HiddenRadioControl
                id={id}
                inputName={idPrefix}
                defaultChecked={checked}
                key={`tab-input-${i}`}
                sx={{
                  '& ~ div': {
                    '&>nav>label': {
                      variant: 'styles.Tabs.Label'
                    },
                    '&>article>section': {
                      variant: 'styles.Tabs.Content'
                    }
                  },
                  '&:checked ~ div': {
                    [`&>nav>label.${id}`]: {
                      variant: 'styles.Tabs.Label.Active'
                    },
                    [`&>article>section.${id}`]: {
                      variant: 'styles.Tabs.Content.Active'
                    }
                  }
                }}
              />
            ],
            [
              ...labelElements,
              <label
                className={id}
                htmlFor={id}
                tabIndex={0}
                onKeyPress={clickOnKeyPress}
                onMouseDown={e => e.preventDefault()}
                key={`tab-label-${i}`}
              >
                {name}
              </label>
            ],
            [
              ...contentElements,
              <section
                className={id}
                variant="styles.Tabs.Content"
                key={`tab-content-${i}`}
              >
                {content}
              </section>
            ]
          ]
        },
        [[], [], []]
      ),
    [tabs]
  )

  return (
    <Box sx={{ overflow: 'auto' }}>
      {radioElements}
      <Box variant="styles.Tabs.Wrapper" sx={sx}>
        <Box as="nav" variant="styles.Tabs.Tabs">
          {labelElements}
        </Box>
        <Box as="article" variant="styles.Tabs.ContentContainer">
          {contentElements}
        </Box>
      </Box>
    </Box>
  )
}
