import React from 'react'
import { Box } from '@theme-ui/components'
import msx from '../styleHelpers.js'

const visible = {
  visibility: 'visible',
  position: 'static',
  width: 'auto',
  height: 'auto',
  overflow: 'auto',
  video: { display: 'unset' }
}

const invisible = {
  display: 'block',
  overflow: 'hidden',
  visibility: 'hidden',
  position: 'absolute',
  width: '0',
  height: '0',
  '& video': { display: 'none' }
}

const Switchable = ({ github, gitlab, bitbucket, idPrefix = undefined }) => (
  <Box>
    <Box
      sx={msx({
        idPrefix,
        ...invisible,
        modes: {
          gitlab: visible
        }
      })}
      aria-label="GitLab-specific content"
    >
      {gitlab}
    </Box>
    <Box
      sx={msx({
        idPrefix,
        ...invisible,
        modes: {
          github: visible
        }
      })}
      aria-label="GitHub-specific content"
    >
      {github}
    </Box>
    <Box
      sx={msx({
        idPrefix,
        ...invisible,
        modes: {
          bitbucket: visible
        }
      })}
      aria-label="Bitbucket-specific content"
    >
      {bitbucket}
    </Box>
  </Box>
)

export default Switchable
