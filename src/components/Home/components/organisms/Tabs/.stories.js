import React from 'react'
import { JSONTabs } from 'components/organisms/Tabs'
import { ThemeProvider } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui'

const tabsData = [
  {
    name: 'First CML Report',
    content: (
      <pre>
        {
          "name: train-my-model\n\non: [push]\n\njobs:\n  run:\n    runs-on: [ubuntu-latest]\n    container: docker://dvcorg/cml-py3:latest\n\n    steps:\n      - uses: actions/checkout@v2\n\n      - name: dvc_cml_run\n        env:\n        repo_token: ${{ secrets.GITHUB_TOKEN }}\n        run: |\n        pip3 install -r requirements.txt\n        python train.py\n\n        cat metrics.txt >> report.md\n        cml-publish confusion_matrix.png --md --title  'confusion-matrix' >> report.md\n        cml-send-github-check report.md\n"
        }
      </pre>
    )
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
      'A HTML/CSS-only component that renders a group of tabbed content.'
  }
}

export const usage = () => (
  <ThemeProvider theme={theme}>
    <JSONTabs content={tabsData} />
  </ThemeProvider>
)
