import React from 'react'
import { Flex } from '@theme-ui/components'

type ICollapserProps = {
  className?: string
  sx?: any
  children?: React.ReactNode
  bp?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Collapser: React.FC<ICollapserProps> = ({
  children,
  sx = {},
  className = '',
  bp = 2,
}) => {

  const flexDirection = ['column']
  for (let i = 1; i < bp; i++) {
    flexDirection.push('')
  }
  flexDirection.push('row')

  return (
    <Flex
      className={className}
      sx={{
        flexDirection,
        flexWrap: 'nowrap',
        '>*': {
          flex: '1'
        },
        ...sx
      }}
    >
      {children}
    </Flex>
  )
}

export default Collapser
