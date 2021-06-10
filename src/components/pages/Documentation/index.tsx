import React from 'react'

import { ThemeProvider } from 'theme-ui'
import { Theme } from '@theme-ui/css';
import theme from '../../../gatsby-plugin-theme-ui'

import Markdown from './Markdown'
import RightPanel from './RightPanel'

import { getItemByPath } from '../../../utils/shared/sidebar'

export interface IHeading {
  slug: string
  text: string
}

interface IDocumentationProps {
  path: string
  headings: Array<IHeading>
  htmlAst: object
}

const Documentation: React.FC<IDocumentationProps> = ({
  htmlAst,
  path,
  headings
}) => {
  const { source, prev, next, tutorials } = getItemByPath(path)
  const githubLink = `https://github.com/iterative/dvc.org/blob/master/content${source}`

  return (
    <ThemeProvider theme={theme as Theme}>
      <Markdown
        htmlAst={htmlAst}
        prev={prev}
        next={next}
        githubLink={githubLink}
        tutorials={tutorials}
      />
      <RightPanel
        headings={headings}
        githubLink={githubLink}
        tutorials={tutorials}
      />
    </ThemeProvider>
  )
}

export default Documentation
