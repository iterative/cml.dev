
import React, { forwardRef } from 'react'

import {
  Box,
  Heading,
  Image,
} from "@theme-ui/components"


import Collapser from "../../../atoms/Collapser"
import Switch from "../../../organisms/SwitchableMode/Switch"
import Switchable from "../../../organisms/SwitchableMode/Switchable"
import { JSONTabs } from "../../../organisms/Tabs"
import Tooltip from "../../../organisms/Tooltip"

import {
  FullWidthBox,
  ExampleBox,
  Code,
} from "../../../../gatsby-plugin-theme-ui/components"

const UseCasesSection: React.ForwardRefRenderFunction<HTMLElement> = (
  _,
  ref
) => (
  <section>
    <FullWidthBox
      id="use-cases"
      sx={{
        textAlign: "center",
        py: "1px",
        fontSize: "18px",
        lineHeight: "28px",
        letterSpacing: "0.02em",
        Inner: {
          my: "80px",
          px: [0, null, null, 3]
        }
      }}
    >

      <Heading
        as="h2"
        sx={{
          color: "text",
          fontSize: ["32px", null, "42px"],
          lineHeight: "52px",
          fontWeight: "bold"
        }}
      >
        CML Use Cases
    </Heading>

      <Box sx={{
        mx: "auto",
        px: "10px",
        maxWidth: "635px",
        my: "40px"
      }}>

        The simplest case of using CML, and a clear way for any user to get started, is to generate a simple report. Add the following .yaml to your project repository and commit to get started

    </Box>

      <Switch sx={{ my: 4, maxWidth: "160px", mx: "auto" }} />

      <JSONTabs
        sx={{ "code, img": { maxHeight: "580px" } }}
        content={[
          {
            name: "First CML Report",
            filename: "cml.yaml",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>

                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-base-case">
                      <div><span>stages:</span></div>
                      <div>  <span>- cml_run</span></div>
                      <div> </div>
                      <div><span>cml:</span></div>
                      <div>  <span>stage: cml_run</span></div>
                      <div>  <span>image: dvcorg/cml-py3:latest</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip3 install -r requirements.txt</span></div>
                        <div>    <span>- python train.py</span></div>
                      </Tooltip>
                      <div> </div>
                      <Tooltip type="reports">
                        <div>    <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>    <span>- cml-publish confusion_matrix.png --md &gt;&gt; report.md</span></div>
                        <div>    <span>- cml-send-comment report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://gitlab.com/iterative.ai/cml-base-case/-/merge_requests/3">
                        <Image src="/img/gitlab/base-case-report.png" alt="GitLab Base report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_base_case">
                      <div><span>name: train-my-model</span></div>
                      <div><span> </span></div>
                      <div>on: [push]</div>
                      <div><span> </span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>run:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: '3.x'</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>repo_token: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>pip3 install -r requirements.txt</span></div>
                        <div>          <span>python train.py</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>          <span>cat metrics.txt >> report.md</span></div>
                        <div>          <span>cml-publish confusion_matrix.png --md >> report.md</span></div>
                        <div>          <span>cml-send-comment report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://github.com/iterative/cml_base_case/pull/2">
                        <Image src="/img/github/base-case-report.png"  alt="Github Base report example"/>
                      </a>
                      {/* [![GitHub Base report example](../src/media/github/base-case-report.png)](https://github.com/iterative/cml_base_case/pull/2) */}
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "DVC",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-dvc-case">
                      <div><span>stages:</span></div>
                      <div>  <span>- cml_run</span></div>
                      <div><span> </span></div>
                      <div><span>cml:</span></div>
                      <div>  <span>stage: cml_run</span></div>
                      <div>  <span>image: dvcorg/cml-py3:latest</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dvc">
                        <div>    <span>- dvc pull data</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- dvc repro</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>    <span># Compare metrics to master</span></div>
                      <div>    <span>- git fetch --prune</span></div>
                      <div>    <span>- dvc metrics diff --show-md master >> report.md</span></div>
                      <div><span> </span></div>
                      <div>    <span># Visualize loss function diff</span></div>
                      <div>    <span>- dvc plots diff </span></div>
                      <div>      <span>--target loss.csv --show-vega master > vega.json</span></div>
                      <Tooltip type="reports">
                        <div>    <span>- vl2png vega.json | cml-publish --md >> report.md</span></div>
                        <div>    <span>- cml-send-comment report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://gitlab.com/iterative.ai/cml-dvc-case/-/merge_requests/6">
                        <Image src="/img/gitlab/dvc-report.png" alt="GitLab DVC report example" />
                      </a>
                      {/* [![GitLab DVC report example](../src/media/gitlab/dvc-report.png)](https://gitlab.com/iterative.ai/cml-dvc-case/-/merge_requests/6) */}
                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_dvc_case">
                      <div><span>name: train-my-model</span></div>
                      <div><span> </span></div>
                      <div><span>on: [push]</span></div>
                      <div><span> </span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>run:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-dvc@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: '3.x'</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>repo_token: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <Tooltip type="dvc">
                        <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.KEY_ID }}"}</span></div>
                        <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.KEY }}"}</span></div>
                      </Tooltip>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="dvc">
                        <div>          <span>dvc pull data</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>pip install -r requirements.txt</span></div>
                        <div>          <span>dvc repro</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>          <span># Compare metrics to master</span></div>
                      <div>          <span>git fetch --prune </span></div>
                      <div>          <span>dvc metrics diff --show-md master >> report.md</span></div>
                      <div><span> </span></div>
                      <div>          <span># Visualize loss function diff</span></div>
                      <div>          <span>dvc plots diff \</span></div>
                      <div>            <span>--target loss.csv --show-vega master > vega.json</span></div>
                      <Tooltip type="reports">
                        <div>          <span>vl2png vega.json -s 1.5 | cml-publish --md  >> report.md</span></div>
                        <div>          <span>cml-send-comment report.md </span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://github.com/iterative/cml_dvc_case/pull/4">
                        <Image src="/img/github/dvc-report.png" alt="GitHub DVC report example" />
                      </a>
                      {/* [![GitHub DVC report example](../src/media/github/dvc-report.png)](https://github.com/iterative/cml_dvc_case/pull/4) */}
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          {
            name: "Tensorboard",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-tensorboard-case">
                      <div><span>stages:</span></div>
                      <div>    <span>- cml_run</span></div>
                      <div><span> </span></div>
                      <div><span>cml:</span></div>
                      <div>    <span>stage: cml_run</span></div>
                      <div>    <span>image: dvcorg/cml-py3:latest</span></div>
                      <div>    <span>script:</span></div>
                      <div>        <span>- pip install -r requirements.txt</span></div>
                      <Tooltip type="tensorboard">
                        <div>        <span>- cml-tensorboard-dev \</span></div>
                        <div>            <span>--logdir logs \</span></div>
                        <div>            <span>--name "Go to tensorboard" \</span></div>
                        <div>            <span>--md >> report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>        <span>- cml-send-comment report.md</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>        <span>- python train.py</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://gitlab.com/iterative.ai/cml-tensorboard-case/-/merge_requests/2">
                        <Image src="/img/gitlab/tensorboard-report.png" alt="GitLab Tensorboard report example" />
                      </a>
                      {/* [![GitLab Tensorboard report example](../src/media/gitlab/tensorboard-report.png)](https://gitlab.com/iterative.ai/cml-tensorboard-case/-/merge_requests/2) */}
                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_tensorboard_case">
                      <div><span>name: train-my-model</span></div>
                      <div><span> </span></div>
                      <div><span>on: [push]</span></div>
                      <div></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>run:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v2</span></div>
                      <div></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: '3.6'</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>repo_token: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>TB_CREDENTIALS: {"${{ secrets.TB_CRED }}"}</span></div>
                      </Tooltip>
                      <div>        <span>run: |</span></div>
                      <div>          <span>pip install -r requirements.txt</span></div>
                      <div><span> </span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>cml-tensorboard-dev \</span></div>
                        <div>            <span>--logdir logs \</span></div>
                        <div>            <span>--name "Go to tensorboard" \</span></div>
                        <div>            <span>--md >> report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>cml-send-comment report.md</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>python train.py</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://github.com/iterative/cml_tensorboard_case/pull/1">
                        <Image src="/img/github/tensorboard-report.png" alt="GitHub Tensorboard report example" />
                      </a>
                      {/* [![GitHub Tensorboard report example](../src/media/github/tensorboard-report.png)](https://github.com/iterative/cml_tensorboard_case/pull/1) */}
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          ,
          {
            name: "CML Runner Cloud",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-runner-example">
                      <div><span>stages:</span></div>
                      <div>  <span>- deploy</span></div>
                      <div>  <span>- train</span></div>
                      <div><span> </span></div>
                      <div><span>deploy_job:</span></div>
                      <div>  <span>stage: deploy</span></div>
                      <div>  <span>when: always</span></div>
                      <div>  <span>image: dvcorg/cml</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>- cml-runner</span></div>
                        <div>      <span>--cloud aws</span></div>
                        <div>      <span>--cloud-region us-west</span></div>
                        <div>      <span>--cloud-type t2.micro</span></div>
                        <div>      <span>--labels=cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div><span>train_job:</span></div>
                      <Tooltip type="reports">
                        <div>  <span>stage: train</span></div>
                        <div>  <span>when: on_success</span></div>
                        <div>  <span>image: dvcorg/cml-py3</span></div>
                        <div>  <span>tags:</span></div>
                        <div>    <span>- cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>script:</span></div>
                      <div>    <span>- pip install -r requirements.txt</span></div>
                      <div>    <span>- python train.py</span></div>
                      <div><span> </span></div>
                      <div>    <span>- echo "## Report from your EC2 Instance" > report.md</span></div>
                      <div>    <span>- cat metrics.txt >> report.md</span></div>
                      <div>    <span>- cml-publish "confusion_matrix.png" --md >> report.md</span></div>
                      <div>    <span>- cml-send-comment report.md</span></div>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://gitlab.com/iterative.ai/cml-runner-example/-/merge_requests/2">
                        <Image src="/img/gitlab/cml-runner-report.png" alt="GitLab Cloud report example" />
                      </a>
                      {/* [![GitLab Cloud report example](../src/media/gitlab/cml-runner-report.png)](https://gitlab.com/iterative.ai/cml-runner-example/-/merge_requests/2) */}
                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml-runner-base-case">
                      <div><span>name: Train-in-the-cloud</span></div>
                      <div><span> </span></div>
                      <div><span>on: [push]</span></div>
                      <div><span> </span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>deploy-runner:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: deploy</span></div>
                      <div>        <span>shell: bash</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>repo_token: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                      <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"}</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span>cml-runner \</span></div>
                        <div>          <span>--cloud aws \</span></div>
                        <div>          <span>--cloud-region us-west \</span></div>
                        <div>          <span>--cloud-type=t2.micro \</span></div>
                        <div>          <span>--labels=cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>model-training:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>needs: deploy-runner</span></div>
                        <div>    <span>runs-on: [self-hosted,cml-runner]</span></div>
                        <div>    <span>container: docker://dvcorg/cml-py3</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>    <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>    <span>- name: "Train my model"</span></div>
                      <div>      <span>env:</span></div>
                      <div>        <span>repo_token: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>      <span>run: |</span></div>
                      <div>        <span>python --version</span></div>
                      <div>        <span>pip install -r requirements.txt</span></div>
                      <div>        <span>python train.py</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo "## Report from your EC2 Instance" > report.md</span></div>
                      <div>        <span>cat metrics.txt >> report.md</span></div>
                      <div>        <span>cml-publish "confusion_matrix.png" --md >> report.md</span></div>
                      <div>        <span>cml-send-comment report.md</span></div>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://github.com/iterative/cml-runner-base-case/pull/4">
                        <Image src="/img/github/cml-runner-report.png" alt="GitHub Cloud report example"/>
                      </a>
                      {/* [![GitHub Cloud report example](../src/media/github/cml-runner-report.png)](https://github.com/iterative/cml-runner-base-case/pull/4) */}
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          ,
          {
            name: "Advanced GPU Case",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-cloud-case">
                      <div><span>stages:</span></div>
                      <div>  <span>- deploy</span></div>
                      <div>  <span>- train</span></div>
                      <div><span> </span></div>
                      <div><span>deploy_job:</span></div>
                      <div>  <span>stage: deploy</span></div>
                      <div>  <span>when: always</span></div>
                      <div>  <span>image: dvcorg/cml</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>- cml-runner \</span></div>
                        <div>      <span>--cloud aws \</span></div>
                        <div>      <span>--cloud-region us-west \</span></div>
                        <div>      <span>--cloud-type=g3.4xlarge \</span></div>
                        <div>      <span>--cloud-hdd-size 64 \</span></div>
                        <div>      <span>--labels=cml-runner-gpu</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div><span>train_job:</span></div>
                      <Tooltip type="reports">
                        <div>  <span>stage: train</span></div>
                        <div>  <span>when: on_success</span></div>
                        <div>  <span>image: dvcorg/cml-py3</span></div>
                        <div>  <span>tags:</span></div>
                        <div>    <span>- cml-runner-gpu</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>script:</span></div>
                      <div>    <span>- apt-get update -y</span></div>
                      <div>    <span>- apt-get install python3-dev -y</span></div>
                      <div>    <span>- apt install imagemagick -y</span></div>
                      <div>    <span>- pip install -r requirements.txt</span></div>
                      <div><span> </span></div>
                      <div>    <span># DVC reproduce neural style transfer training</span></div>
                      <div>    <span>- git fetch --prune</span></div>
                      <div>    <span>- dvc repro</span></div>
                      <div><span> </span></div>
                      <div>    <span># Compare master and workspace image results</span></div>
                      <div>    <span>- echo "# Style transfer" >> report.md</span></div>
                      <div>    <span>- git show origin/master:final_owl.png > master_owl.png</span></div>
                      <div>    <span>- convert +append final_owl.png master_owl.png out.png</span></div>
                      <div>    <span>- convert out.png -resize 75% out_shrink.png</span></div>
                      <div>    <span>- echo "### Workspace vs. Master" >> report.md</span></div>
                      <div>    <span>- cml-publish out_shrink.png --md >> report.md</span></div>
                      <div><span> </span></div>
                      <div>    <span># Report training parameters</span></div>
                      <div>    <span>- echo "## Training parameter diffs" >> report.md</span></div>
                      <div>    <span>- dvc params diff master --show-md >> report.md</span></div>
                      <div>    <span>- echo >> report.md</span></div>
                      <div><span> </span></div>
                      <div>    <span># Report GPU details</span></div>
                      <div>    <span>- echo "## GPU info" >> report.md</span></div>
                      <div>    <span>- cat gpu_info.txt >> report.md</span></div>
                      <div><span> </span></div>
                      <div>    <span>- cml-send-comment report.md </span></div>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://gitlab.com/iterative.ai/cml-cloud-case/-/merge_requests/1">
                        <Image src="/img/gitlab/cloud-report.png" alt="GitLab Cloud report example"/>
                      </a>
                      {/* [![GitLab Cloud report example](../src/media/gitlab/cloud-report.png)](https://gitlab.com/iterative.ai/cml-cloud-case/-/merge_requests/1) */}

                    </ExampleBox>

                  </Collapser>
                )}
                github={(
                  <Collapser>
                    <Code filename=".github/workflows/cml.yaml" repo="https://github.com/iterative/cml_cloud_case">

                      <div><span>name: train-my-model</span></div>
                      <div><span> </span></div>
                      <div><span>on: [push]</span></div>
                      <div><span> </span></div>
                      <div><span>jobs:</span></div>
                      <div>  <span>deploy-runner:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: deploy</span></div>
                      <div>        <span>shell: bash</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>repo_token: {"${{ secrets.secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                      <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"} </span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span>cml-runner \</span></div>
                        <div>          <span>--cloud aws \</span></div>
                        <div>          <span>--cloud-region us-west \</span></div>
                        <div>          <span>--cloud-type=g3.4xlarge \</span></div>
                        <div>          <span>--cloud-hdd-size 64 \</span></div>
                        <div>          <span>--labels=cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>run:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>needs: deploy-runner</span></div>
                        <div>    <span>runs-on: [self-hosted,cml-runner]</span></div>
                        <div>    <span>container: </span></div>
                        <div>      <span>image: docker://dvcorg/cml</span></div>
                      </Tooltip>
                      <Tooltip type="tensorboard">
                        <div>      <span>options: --gpus all</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>    <span>- uses: actions/checkout@v2</span></div>
                      <div><span> </span></div>
                      <div>    <span>- uses: actions/setup-python@v2</span></div>
                      <div>      <span>with:</span></div>
                      <div>        <span>python-version: '3.6'</span></div>
                      <div><span> </span></div>
                      <div>    <span>- name: cml</span></div>
                      <div>      <span>env:</span></div>
                      <div>        <span>repo_token: {"${{ secrets.secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>      <span>run: |</span></div>
                      <div>        <span>apt-get update -y</span></div>
                      <div>        <span>apt install imagemagick -y</span></div>
                      <div>        <span>pip install -r requirements.txt</span></div>
                      <div><span> </span></div>
                      <div>        <span># DVC stuff</span></div>
                      <div>        <span>git fetch --prune</span></div>
                      <div>        <span>dvc repro</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo "# Style transfer" >> report.md</span></div>
                      <div>        <span>git show origin/master:final_owl.png > master_owl.png</span></div>
                      <div>        <span>convert +append final_owl.png master_owl.png out.png</span></div>
                      <div>        <span>convert out.png -resize 75%  out_shrink.png</span></div>
                      <div>        <span>echo "### Workspace vs. Main" >> report.md</span></div>
                      <div>        <span>cml-publish out_shrink.png --md --title 'compare' >> report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo "## Training metrics" >> report.md</span></div>
                      <div>        <span>dvc params diff master --show-md >> report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo >> report.md</span></div>
                      <div>        <span>echo "## GPU info" >> report.md</span></div>
                      <div>        <span>cat gpu_info.txt >> report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>cml-send-comment report.md </span></div>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" href="https://github.com/iterative/cml_cloud_case/pull/11">
                        <Image src="/img/github/cloud-report.png" alt="GitHub Cloud report example"/>
                      </a>
                      {/* [![GitHub Cloud report example](../src/media/github/cloud-report.png)](https://github.com/iterative/cml_cloud_case/pull/11) */}

                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          }
        ]} />

    </FullWidthBox>
  </section>
)

export default forwardRef<HTMLElement>(UseCasesSection)