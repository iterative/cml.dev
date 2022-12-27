import React from 'react'

import { Box, Flex } from '@theme-ui/components'

import SmartLink from '../SmartLink'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as StarIcon } from '@media/icons/star.svg'
import useStars from '../../../gatsby/hooks/stars'

const GithubLine: React.FC = () => {
  const stars = useStars()

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
        className="underline"
        sx={{
          ml: '5px',
          color: 'background',
          ':hover': { color: 'background' }
        }}
        href="https://github.com/iterative/cml"
      >
        GitHub
      </SmartLink>
      {stars && (
        <Flex className="items-center" as="span">
          <Box as="span" sx={{ ml: '7px' }}>
            <StarIcon width="11" height="11" />
          </Box>
          <Box as="span" sx={{ ml: '7px', fontWeight: 500, display: 'block' }}>
            {stars}
          </Box>
        </Flex>
      )}
    </Flex>
  )
}

export default GithubLine
