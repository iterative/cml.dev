import React from 'react'
import { Box } from '@theme-ui/components'
import { alpha, mix } from '@theme-ui/color'
import types from './types.json'

const getIndent = line => {
  const firstChild = line.props.children[0]
  return typeof firstChild === 'string' && firstChild.match(/^[ \t]+$/)
    ? firstChild.length
    : 0
}

const Tooltip = ({
  className = '',
  type,
  children,
  indent = Array.isArray(children)
    ? Math.min(...children.map(getIndent))
    : getIndent(children)
}) => {
  const { color, href, title = type } = types[type]
  const left = indent ? `calc(50% + ${indent * 5}px)` : '50%'
  return (
    <Box
      as={href ? 'a' : 'div'}
      aria-label={title}
      href={href}
      className={className}
      sx={{
        variant: 'styles.Highlight',
        position: 'relative',
        '& span': {
          color: mix('background', color, 0.2),
          backgroundColor: alpha(color, 0.2)
        },
        ':before': {
          variant: 'styles.Tooltip.Bubble',
          content: `"${title}"`
        },
        ':after': {
          variant: 'styles.Tooltip.Arrow'
        },
        '&:before, &:after': {
          left
        },
        '&:hover:before, &:hover:after': {
          variant: 'styles.Tooltip.Active'
        },
        '&:hover span': {
          color: mix('background', color, 0.3),
          backgroundColor: alpha(color, 0.3)
        }
      }}
    >
      {children}
    </Box>
  )
}

export default Tooltip
