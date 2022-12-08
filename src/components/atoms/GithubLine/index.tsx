import React from 'react'

import { Flex } from '@theme-ui/components'

import SmartLink from '../SmartLink'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'

const GithubLine: React.FC = () => {
  return (
    <Flex
      sx={{
        mt: ['24px', null, null, '50px'],
        justifyContent: 'start',
        alignItems: 'center',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        color: 'rgba(256, 256, 256, 0.7)'
      }}
    >
      <Flex as="span" sx={{ mr: 9 }}>
        <GithubIcon width="20" height="20" />
      </Flex>
      We’re on{' '}
      <SmartLink
        sx={{
          ml: '5px',
          color: 'background',
          ':hover': { color: 'background' }
        }}
        href="https://github.com/iterative/cml"
      >
        GitHub
      </SmartLink>
    </Flex>
  )
}

export default GithubLine
