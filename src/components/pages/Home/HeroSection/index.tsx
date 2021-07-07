import React, { forwardRef } from 'react'

import {
  Box,
  Link,
  Heading,
} from '@theme-ui/components'

import Header from '../../../organisms/SiteHeader'
import LandingVideo from '../../../molecules/Video/LandingVideo'
import Collapser from '../../../atoms/Collapser'
import Switch from '../../../organisms/SwitchableMode/Switch'
import Switchable from '../../../organisms/SwitchableMode/Switchable'

import {
  FullWidthBox,
  HomeFeature
} from '../../../../gatsby-plugin-theme-ui/components'

import { ReactComponent as GitFlowIcon } from '@media/icons/gitflow.svg'
import { ReactComponent as ReportsIcon } from '@media/icons/reports.svg'
import { ReactComponent as BoxIcon } from '@media/icons/cube.svg'

import githubVideoMp4 from '@media/github/landing-video.mp4'
import gitlabVideoMp4 from '@media/gitlab/landing-video.mp4'

import backgroundImage from '@media/landing-background.png'

const HeroSection: React.ForwardRefRenderFunction<HTMLElement> = (_, ref) => (
  <section id="hero">
    <FullWidthBox
      className="hero-section"
      sx={{
        backgroundColor: 'text',
        backgroundImage: [null, null, null, `url("${backgroundImage}")`],
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        color: 'background',
        overflow: 'hidden',
        textAlign: 'center',
        Inner: {
          maxWidth: '100%',
          px: 0
        }
      }}
    >
      <Header isMain />
      <Collapser
        className="collapser"
        sx={{
          variant: 'layout.container',
          height: [null, null, null, '618px'],
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ flex: '1', textAlign: ['center', null, 'left'] }}>
          <Heading
            as="h1"
            sx={{
              fontSize: ['32px', null, null, '42px'],
              my: 4,
              ml: 2,
              mr: [2, null, '45px'],
              maxWidth: '500px'
            }}
          >
            Continuous Machine Learning (CML) is CI/CD for Machine Learning
            Projects
          </Heading>
          <Link
            variant="button"
            href="https://github.com/iterative/cml#getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </Link>
          <Link
            variant="button"
            sx={{
              backgroundColor: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              display: ['block', 'inline-block'],
              px: '32px',
              ml: ['auto', '15px'],
              mr: ['auto', 0],
              mt: ['15px', 0],
              lineHeight: '46px',
              width: 'fit-content',
              '&:hover': {
                backgroundColor: '#704BB4',
                border: '2px solid #704BB4'
              },
              '&:focus': {
                backgroundColor: '#9361D3',
                border: '2px solid #9361D3'
              }
            }}
            href="https://github.com/iterative/cml#install-cml-as-a-package"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </Link>
        </Box>
        <Box sx={{ flex: '1', width: '100%' }}>
          <Switch
            sx={{ mt: 4, mx: 'auto', maxWidth: ['100%', null, '160px'] }}
          />
          <Switchable
            gitlab={<LandingVideo src={gitlabVideoMp4} mode="gitlab" />}
            github={<LandingVideo src={githubVideoMp4} mode="github" />}
          />
        </Box>
      </Collapser>

      <Collapser
        sx={{
          variant: 'layout.container',
          my: 4,
          flexDirection: ['column', null, null, 'row']
        }}
      >
        <HomeFeature heading="GitFlow for data science" icon={GitFlowIcon}>
          Use GitLab or GitHub to manage ML experiments, track who trained ML
          models or modified data and when. Codify data and models with DVC
          instead of pushing to your Git repo.
        </HomeFeature>
        <HomeFeature
          heading="Auto reports for ML experiments"
          icon={ReportsIcon}
        >
          Auto-generate reports with metrics and plots in each Git Pull Request.
          Rigorous engineering practices help your team make informed,
          data-driven decisions.
        </HomeFeature>
        <HomeFeature heading="No additional services" icon={BoxIcon}>
          Build your own ML platform using just GitHub or GitLab and your
          favorite cloud services: AWS, Azure, GCP. No databases, services or
          complex setup needed.
        </HomeFeature>
      </Collapser>
    </FullWidthBox>
  </section>
)

export default forwardRef<HTMLElement>(HeroSection)
