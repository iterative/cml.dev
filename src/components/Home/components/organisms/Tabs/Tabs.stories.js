import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { JSONTabs } from 'components/organisms/Tabs'
import { Box } from '@theme-ui/components'

const tabsData = [
  {
    name: 'First CML Report',
    content: <h1>This is tab one!</h1>
  },
  {
    name: 'DVC',
    content: <h2>This is tab two!</h2>
  },
  {
    name: 'Tensorboard',
    content: <h3>This is tab three!</h3>
  }
]

export default {
  title: 'JSONTabs',
  parameters: {
    component: JSONTabs,
    componentSubtitle:
      'A component that selectively renders one of many components. Can fall back to pure HTML/CSS.'
  }
}

export const usage = () => (
  <Box
    sx={{
      backgroundColor: 'white',
      px: [1, 3],
      py: 5,
      boxSizing: 'border-box'
    }}
  >
    <JSONTabs content={tabsData} name="frontpage" />
  </Box>
)
