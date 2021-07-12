import React, { forwardRef } from 'react'

import { Box, Heading } from '@theme-ui/components'

import {
  FullWidthBox,
  SolutionList
} from '../../../../gatsby-plugin-theme-ui/components'

const MLOpsSection: React.ForwardRefRenderFunction<HTMLElement> = () => (
  <section>
    <FullWidthBox
      sx={{
        backgroundColor: 'gray',
        textAlign: 'center',
        py: '5px',
        Inner: {
          my: '85px'
        }
      }}
    >
      <Heading
        as="h2"
        sx={{
          color: 'text',
          lineHeight: '52px',
          fontWeight: 'bold',
          fontSize: ['32px', null, '42px']
        }}
      >
        The MLOps Ecosystem
      </Heading>

      <Box
        sx={{
          fontSize: '18px',
          lineHeight: '28px',
          letterSpacing: '0.02em',
          mx: 'auto',
          maxWidth: '460px'
        }}
      >
        MLOps isn&apos;t a platform- it&apos;s an ecosystem of tools. CML helps
        you bring your favorite DevOps tools to machine learning.
      </Box>

      <SolutionList
        sx={{
          maxWidth: '834px',
          my: '40px',
          mx: 'auto'
        }}
      >
        {[
          ['Continuous integration for ML', 'CML'],
          ['Manage environments', 'Docker and Packer'],
          ['Infrastructure as code', 'Terraform and Docker-Machine'],
          ['Data as code', 'DVC']
        ]}
      </SolutionList>
    </FullWidthBox>
  </section>
)

export default forwardRef<HTMLElement>(MLOpsSection)
