
import React, { forwardRef } from "react"

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

const UseCasesSection: React.ForwardRefRenderFunction<HTMLElement> = () => (
  <section id="use-cases">
    <FullWidthBox
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
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>    <span># Create CML report</span></div>
                        <div>    <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-base-case/-/merge_requests/3">
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
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: &apos;3.x&apos;</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>pip3 install -r requirements.txt</span></div>
                        <div>          <span>python train.py</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="reports">
                        <div>          <span>cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>          <span>echo &#x27;![](./plot.png)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_base_case/pull/2">
                        <Image src="/img/github/base-case-report.png" alt="Github Base report example" />
                      </a>
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
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
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
                      <Tooltip type="reports">
                        <div>    <span># Compare metrics to main</span></div>
                        <div>    <span>- git fetch --depth=1 origin main:main</span></div>
                        <div>    <span>- dvc metrics diff --show-md main &gt;&gt; report.md</span></div>
                        <div>    <span># Visualize loss function diff</span></div>
                        <div>    <span>- dvc plots diff </span></div>
                        <div>      <span>--target loss.csv --show-vega main &gt; vega.json</span></div>
                        <div>    <span># Create CML report</span></div>
                        <div>    <span>- vl2png vega.json &gt; plot.png</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Training Loss&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-dvc-case/-/merge_requests/6">
                        <Image src="/img/gitlab/dvc-report.png" alt="GitLab DVC report example" />
                      </a>
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
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: iterative/setup-dvc@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: &apos;3.x&apos;</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
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
                      <div>          <span>dvc metrics diff --show-md master &gt;&gt; report.md</span></div>
                      <div><span> </span></div>
                      <div>          <span># Visualize loss function diff</span></div>
                      <div>          <span>dvc plots diff \</span></div>
                      <div>            <span>--target loss.csv --show-vega master &gt; vega.json</span></div>
                      <Tooltip type="reports">
                        <div>          <span>vl2png vega.json -s 1.5 &gt; plot.png</span></div>
                        <div>          <span>echo &#x27;![](./plot.png)&#x27; &gt;&gt; report.md</span></div>
                        <div>          <span>cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_dvc_case/pull/4">
                        <Image src="/img/github/dvc-report.png" alt="GitHub DVC report example" />
                      </a>
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
                      <div><span>train-and-report:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <div>    <span>- pip install -r requirements.txt</span></div>
                      <Tooltip type="tensorboard">
                        <div>    <span>- cml tensorboard connect</span></div>
                        <div>      <span>--logdir=./logs</span></div>
                        <div>      <span>--name=&quot;Go to tensorboard&quot;</span></div>
                        <div>      <span>--md &gt;&gt; report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- python train.py  # generate ./logs</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-tensorboard-case/-/merge_requests/2">
                        <Image src="/img/gitlab/tensorboard-report.png" alt="GitLab Tensorboard report example" />
                      </a>
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
                      <div>  <span>train-and-report:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div><span> </span></div>
                      <div>      <span>- uses: actions/setup-python@v2</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>python-version: &apos;3.6&apos;</span></div>
                      <div><span> </span></div>
                      <div>      <span>- name: cml</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.GITHUB_TOKEN }}"}</span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>TB_CREDENTIALS: {"${{ secrets.TB_CRED }}"}</span></div>
                      </Tooltip>
                      <div>        <span>run: |</span></div>
                      <div>          <span>pip install -r requirements.txt</span></div>
                      <div><span> </span></div>
                      <Tooltip type="tensorboard">
                        <div>          <span>cml tensorboard connect \</span></div>
                        <div>            <span>--logdir logs \</span></div>
                        <div>            <span>--name &quot;Go to tensorboard&quot; \</span></div>
                        <div>            <span>--md &gt;&gt; report.md</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>          <span>cml comment create report.md</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <Tooltip type="dependencies">
                        <div>          <span>python train.py</span></div>
                      </Tooltip>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_tensorboard_case/pull/1">
                        <Image src="/img/github/tensorboard-report.png" alt="GitHub Tensorboard report example" />
                      </a>
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
                      <div><span>launch-runner:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="runner">
                        <div>    <span># Supports AWS, Azure, GCP, K8s</span></div>
                        <div>    <span>- cml runner launch</span></div>
                        <div>      <span>--cloud=aws</span></div>
                        <div>      <span>--cloud-region=us-west</span></div>
                        <div>      <span>--cloud-type=m5.2xlarge</span></div>
                        <div>      <span>--cloud-spot</span></div>
                        <div>      <span>--labels=cml-runner</span></div>
                        <div><span>train-and-report:</span></div>
                        <div>  <span>tags: [cml-runner]</span></div>
                      </Tooltip>
                      <div>  <span>needs: [launch-runner]</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- python train.py  # generate plot.png</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- echo &quot;## Report from your EC2 instance&quot; &gt;&gt; report.md</span></div>
                        <div>    <span>- cat metrics.txt &gt;&gt; report.md</span></div>
                        <div>    <span>- echo &#x27;![](./plot.png &quot;Confusion Matrix&quot;)&#x27; &gt;&gt; report.md</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-runner-example/-/merge_requests/2">
                        <Image src="/img/gitlab/cml-runner-report.png" alt="GitLab Cloud report example" />
                      </a>
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
                      <div>  <span>launch-runner:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div>      <span>- name: deploy</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                      <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"}</span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span>cml runner launch \</span></div>
                        <div>          <span>--cloud aws \</span></div>
                        <div>          <span>--cloud-region us-west \</span></div>
                        <div>          <span>--cloud-type=t2.micro \</span></div>
                        <div>          <span>--labels=cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>model-training:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>needs: launch-runner</span></div>
                        <div>    <span>runs-on: [self-hosted,cml-runner]</span></div>
                        <div>    <span>container: docker://iterativeai/cml:0-dvc2-base1</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>    <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div><span> </span></div>
                      <div>    <span>- name: &quot;Train my model&quot;</span></div>
                      <div>      <span>env:</span></div>
                      <div>        <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>      <span>run: |</span></div>
                      <div>        <span>python --version</span></div>
                      <div>        <span>pip install -r requirements.txt</span></div>
                      <div>        <span>python train.py</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo &quot;## Report from your EC2 Instance&quot; &gt; report.md</span></div>
                      <div>        <span>cat metrics.txt &gt;&gt; report.md</span></div>
                      <div>        <span>echo &#x27;![](./plot.png)&#x27; &gt;&gt; report.md</span></div>
                      <div>        <span>cml comment create report.md</span></div>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml-runner-base-case/pull/4">
                        <Image src="/img/github/cml-runner-report.png" alt="GitHub Cloud report example" />
                      </a>
                    </ExampleBox>

                  </Collapser>
                )}
              />
            )
          },
          ,
          {
            name: "Runner Cloud GPU",
            content: (
              <Switchable
                gitlab={(
                  <Collapser>
                    <Code filename=".gitlab-ci.yml" repo="https://gitlab.com/iterative.ai/cml-cloud-case">
                      <div><span>launch-runner:</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="runner">
                        <div>    <span># Supports AWS, Azure, GCP, K8s</span></div>
                        <div>    <span>- cml runner launch</span></div>
                        <div>      <span>--cloud=aws</span></div>
                        <div>      <span>--cloud-region=us-west</span></div>
                        <div>      <span>--cloud-type=p2.xlarge</span></div>
                        <div>      <span>--cloud-hdd-size=64</span></div>
                        <div>      <span>--cloud-spot</span></div>
                        <div>      <span>--labels=cml-gpu</span></div>
                        <div><span>train-and-report:</span></div>
                        <div>  <span>tags: [cml-gpu]</span></div>
                      </Tooltip>
                      <div>  <span>needs: [launch-runner]</span></div>
                      <div>  <span>image: iterativeai/cml:0-dvc2-base1-gpu</span></div>
                      <div>  <span>script:</span></div>
                      <Tooltip type="dvc">
                        <div>    <span>- dvc pull data</span></div>
                      </Tooltip>
                      <Tooltip type="dependencies">
                        <div>    <span>- pip install -r requirements.txt</span></div>
                        <div>    <span>- dvc repro</span></div>
                      </Tooltip>
                      <Tooltip type="reports">
                        <div>    <span>- git show origin/main:image.png &gt; image-main.png</span></div>
                        <div>    <span>- |</span></div>
                        <div>    <span>  cat &lt;&lt;EOF &gt; report.md</span></div>
                        <div>    <span>  # Style transfer</span></div>
                        <div>    <span>  ## Workspace vs. Main</span></div>
                        <div>    <span>  ![](./image.png &quot;Workspace&quot;) ![](./image-main.png &quot;Main&quot;)</span></div>
                        <div>    <span>  ## Training metrics</span></div>
                        <div>    <span>  $(dvc params diff main --show-md)</span></div>
                        <div>    <span>  ## GPU info</span></div>
                        <div>    <span>  $(cat gpu_info.txt)</span></div>
                        <div>    <span>  EOF</span></div>
                        <div>    <span>- cml comment create report.md</span></div>
                      </Tooltip>
                    </Code>

                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://gitlab.com/iterative.ai/cml-cloud-case/-/merge_requests/1">
                        <Image src="/img/gitlab/cloud-report.png" alt="GitLab Cloud report example" />
                      </a>
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
                      <div>  <span>launch-runner:</span></div>
                      <div>    <span>runs-on: [ubuntu-latest]</span></div>
                      <div>    <span>steps:</span></div>
                      <div>      <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div>      <span>- uses: iterative/setup-cml@v1</span></div>
                      <div>      <span>- name: deploy</span></div>
                      <div>        <span>env:</span></div>
                      <div>          <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>          <span>AWS_ACCESS_KEY_ID: {"${{ secrets.AWS_ACCESS_KEY_ID }}"}</span></div>
                      <div>          <span>AWS_SECRET_ACCESS_KEY: {"${{ secrets.AWS_SECRET_ACCESS_KEY }}"} </span></div>
                      <div>        <span>run: |</span></div>
                      <Tooltip type="reports">
                        <div>          <span>cml runner launch \</span></div>
                        <div>          <span>--cloud aws \</span></div>
                        <div>          <span>--cloud-region us-west \</span></div>
                        <div>          <span>--cloud-type=p2.xlarge \</span></div>
                        <div>          <span>--cloud-hdd-size 64 \</span></div>
                        <div>          <span>--labels=cml-runner</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>  <span>train-and-report:</span></div>
                      <Tooltip type="reports">
                        <div>    <span>needs: launch-runner</span></div>
                        <div>    <span>runs-on: [self-hosted,cml-runner]</span></div>
                        <div>    <span>container: </span></div>
                        <div>      <span>image: docker://iterativeai/cml:0-dvc2-base1-gpu</span></div>
                      </Tooltip>
                      <Tooltip type="tensorboard">
                        <div>      <span>options: --gpus all</span></div>
                      </Tooltip>
                      <div><span> </span></div>
                      <div>    <span>steps:</span></div>
                      <div>    <span>- uses: actions/checkout@v3</span></div>
                      <div>        <span>with:</span></div>
                      <div>          <span>ref: {"${{ github.event.pull_request.head.sha }}"}</span></div>
                      <div><span> </span></div>
                      <div>    <span>- uses: actions/setup-python@v2</span></div>
                      <div>      <span>with:</span></div>
                      <div>        <span>python-version: &apos;3.6&apos;</span></div>
                      <div><span> </span></div>
                      <div>    <span>- name: cml</span></div>
                      <div>      <span>env:</span></div>
                      <div>        <span>REPO_TOKEN: {"${{ secrets.PERSONAL_ACCESS_TOKEN }}"}</span></div>
                      <div>      <span>run: |</span></div>
                      <div>        <span>apt-get update -y</span></div>
                      <div>        <span>apt install imagemagick -y</span></div>
                      <div>        <span>pip install -r requirements.txt</span></div>
                      <div><span> </span></div>
                      <div>        <span># DVC stuff</span></div>
                      <div>        <span>git fetch --prune</span></div>
                      <div>        <span>dvc repro</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo &quot;# Style transfer&quot; &gt;&gt; report.md</span></div>
                      <div>        <span>git show origin/master:final_owl.png &gt; master_owl.png</span></div>
                      <div>        <span>convert +append final_owl.png master_owl.png out.png</span></div>
                      <div>        <span>convert out.png -resize 75%  out_shrink.png</span></div>
                      <div>        <span>echo &quot;### Workspace vs. Main&quot; &gt;&gt; report.md</span></div>
                      <div>        <span>echo &#x27;![](./out_shrink.png &quot;compare&quot;)&#x27; &gt;&gt; report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo &quot;## Training metrics&quot; &gt;&gt; report.md</span></div>
                      <div>        <span>dvc params diff master --show-md &gt;&gt; report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>echo &gt;&gt; report.md</span></div>
                      <div>        <span>echo &quot;## GPU info&quot; &gt;&gt; report.md</span></div>
                      <div>        <span>cat gpu_info.txt &gt;&gt; report.md</span></div>
                      <div><span> </span></div>
                      <div>        <span>cml comment create report.md</span></div>
                    </Code>
                    <ExampleBox title="CML Report">
                      <a target="_blank" rel="noreferrer" href="https://github.com/iterative/cml_cloud_case/pull/11">
                        <Image src="/img/github/cloud-report.png" alt="GitHub Cloud report example" />
                      </a>
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
