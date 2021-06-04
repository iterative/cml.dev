import React, { forwardRef } from 'react'

import {
  Button,
  Flex,
  Box,
  Container,
  Link,
  Heading,
  Image,
  Text
} from '@theme-ui/components'

import Header from '../../components/organisms/SiteHeader'
import LandingVideo from '../../components/molecules/Video/LandingVideo'
import Collapser from '../../components/atoms/Collapser'
import Switch from '../../components/organisms/SwitchableMode/Switch'
import Switchable from '../../components/organisms/SwitchableMode/Switchable'

import {
  FullWidthBox,
  HomeFeature,
  SolutionList
} from '../../../../gatsby-plugin-theme-ui/components'

const MLOpsSection: React.ForwardRefRenderFunction<HTMLElement> = (_, ref) => (
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
        MLOps isn't a platform- it's an ecosystem of tools. CML helps you bring
        your favorite DevOps tools to machine learning.
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
