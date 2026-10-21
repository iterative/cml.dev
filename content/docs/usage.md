# Usage

A GitLab, GitHub, or Bitbucket account is required. Familiarity with
[GitHub Actions](https://help.github.com/en/actions),
[GitLab CI/CD](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration),
or [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) may
also be beneficial.

<toggle>
<tab title="GitHub">

The key file in any CML project is `.github/workflows/cml.yaml`:

```yaml
name: CML
on: [push]
jobs:
  train-and-report:
    runs-on: ubuntu-latest
    # optionally use a convenient Ubuntu LTS + DVC + CML container
    # container: docker://ghcr.io/iterative/cml:0-dvc2-base1
    steps:
      # may need to setup Node.js & Python3 on e.g. self-hosted
      # - uses: actions/setup-node@v7
      #   with:
      #     node-version: '24'
      # - uses: actions/setup-python@v7
      #   with:
      #     python-version: '3.x'
      - uses: iterative/setup-cml@v2
      - uses: actions/checkout@v7
      - name: Train model
        run: |
          # Your ML workflow goes here
          pip install -r requirements.txt
          python train.py  # generate plot.png
      - name: Create CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # where plot.png is uploaded, see https://cml.dev/doc/image-hosting
          CML_COMMENT_PUBLISH_URL: ${{ secrets.CML_COMMENT_PUBLISH_URL }}
        run: |
          # Post CML report as a comment in GitHub
          cat metrics.txt >> report.md
          echo '![](./plot.png "Confusion Matrix")' >> report.md
          cml comment create report.md
```

This generates visual reports in pull requests (see `cml comment create`):

![First CML report in GitHub](/img/cml_first_report.png) _From sample
[increase forest depth](https://github.com/iterative/cml_base_case/pull/2) PR_

We helpfully provide CML and other useful libraries pre-installed on our
[custom Docker images](/doc/self-hosted-runners#docker-images). In the above
example, uncommenting the
`container: docker://ghcr.io/iterative/cml:0-dvc2-base1` field will make the
runner pull the CML Docker image. The image already has Node.js, Python 3, DVC
and CML set up on an Ubuntu LTS base for convenience.

### Example projects

- [Basic CML project](https://github.com/iterative/cml_base_case)
- [CML with DVC to pull data](https://github.com/iterative/cml_dvc_case) &
  [tutorial](/doc/cml-with-dvc?tab=GitHub)
- [CML with Tensorboard](https://github.com/iterative/cml_tensorboard_case)
- [CML with EC2 GPU](https://github.com/iterative/cml_cloud_case)

</tab>
<tab title="GitLab">

Integrate CML to your
[pipeline configuration](https://docs.gitlab.com/ee/ci/pipelines/#configure-a-pipeline)
using the `.gitlab-ci.yml` file, for example:

```yaml
train-model:
  # use a convenient Ubuntu LTS + DVC + CML container
  image: iterativeai/cml:0-dvc2-base1
  script:
    - pip install -r requirements.txt
    - python train.py # generate plot.png
create-CML-report:
  needs: [train-model]
  image: iterativeai/cml:0-dvc2-base1
  script:
    # Post CML report as a comment in GitLab
    - cat metrics.txt >> report.md
    - echo '![](./plot.png "Confusion Matrix")' >> report.md
    - cml comment create --publish-native report.md
```

<admon type="warn">

You _must_ provide a
[personal or project access token (PAT)](/doc/self-hosted-runners#personal-access-token)
via a `REPO_TOKEN` variable.

</admon>

This generates visual reports in pull requests (see `cml comment create`):

![First CML report in GitLab](/img/GitLab_CML_report.png '=400') _From sample
[Experiment](https://gitlab.com/iterative.ai/cml-base-case/-/merge_requests/1)
MR_

We helpfully provide CML and other useful libraries pre-installed on our
[custom Docker images](/doc/self-hosted-runners#docker-images). In the above
example, the `image: iterativeai/cml:0-dvc2-base1` field will make the runner
pull the CML Docker image. The image already has Node.js, Python 3, DVC and CML
set up on an Ubuntu LTS base for convenience.

### Example projects

- [Basic CML project](https://gitlab.com/iterative.ai/cml-base-case)
- [CML with DVC to pull data](https://gitlab.com/iterative.ai/cml-dvc-case) &
  [tutorial](/doc/cml-with-dvc?tab=GitLab)
- [CML with Tensorboard](https://gitlab.com/iterative.ai/cml-tensorboard-case)
- [CML with EC2 GPU](https://gitlab.com/iterative.ai/cml-cloud-case)

</tab>
<tab title="Bitbucket">

Integrate CML to your
[pipeline configuration](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/)
using the `bitbucket-pipelines.yml` file, for example:

```yaml
image: iterativeai/cml:0-dvc2-base1
pipelines:
  default:
    - step:
        name: Train model
        script:
          - pip install -r requirements.txt
          - python train.py # generate plot.png
    - step:
        name: Create CML report
        script:
          # Post CML report as a comment in Bitbucket
          - cat metrics.txt >> report.md
          - echo '![](./plot.png "Confusion Matrix")' >> report.md
          - cml comment create --publish-native report.md
```

<admon type="warn">

You _must_ provide
[access credentials](/doc/self-hosted-runners#personal-access-token) via a
`REPO_TOKEN` variable.

</admon>

This generates visual reports in pull requests (see `cml comment create`):

![First CML report in BitBucket](/img/bitbucket_cloud_pr.png '=600') _From
sample
[Experiment](https://bitbucket.org/iterative-ai/cml-base-case/pull-requests/1)
PR_

<admon type="warn">

CML works with Bitbucket Cloud, where you can use the
[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) CI/CD
system to run workflows automatically on triggering events. Bitbucket Server is
not yet supported.

</admon>

### Example projects

- [Basic CML project](https://bitbucket.org/iterative-ai/cml-base-case)
- [CML with DVC to pull data](https://bitbucket.org/iterative-ai/cml-dvc-case)
- [CML with Tensorboard](https://bitbucket.org/iterative-ai/cml-tensorboard-case)
- [CML with EC2 instance](https://bitbucket.org/iterative-ai/cml-cloud-case)

</tab>
</toggle>

## CML Commands

Below is a list of [CML commands](/doc/ref) for starting cloud compute runners,
writing and publishing Markdown reports to your CI/CD system.

∞ **[`runner`](/doc/ref/runner)**\
Launch a runner hosted by a cloud compute provider or locally on-premise (see [self-hosted runners](/doc/self-hosted-runners))\
e.g. `cml runner launch --cloud={aws,azure,gcp,kubernetes} ...`

∞ **[`pr`](/doc/ref/pr)**\
Commit specified files to a new branch and create a pull request\
e.g. `cml pr create "**/*.json" "**/*.py" --md >> report.md`

∞ **[`comment`](/doc/ref/comment)**\
Post a Markdown report as a commit comment\
e.g. `cml comment create report.md`

∞ **[`check`](/doc/ref/check)**\
Post a Markdown report as a GitHub check\
e.g. `cml check create report.md`

∞ **[`tensorboard`](/doc/ref/tensorboard)**\
Return a link to a <https://tensorboard.dev> page (no longer available)\
e.g. `cml tensorboard connect --logdir=./logs --md >> report.md`

### CML Reports

The `cml comment create` command can be used to post reports. CML reports are
written in Markdown ([GitHub](https://github.github.com/gfm),
[GitLab](https://docs.gitlab.com/ee/user/markdown.html), or
[Bitbucket](https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html)
flavors). That means they can contain images, tables, formatted text, HTML
blocks, code snippets and more — really, what you put in a CML report is up to
you. Some examples:

📝 **Text** Write to your report using whatever method you prefer. For example,
copy the contents of a text file containing the results of ML model training:

```cli
$ cat results.txt >> report.md
```

🖼️ **Images** Display images using the markdown or HTML. Note that if an image
is an output of your ML workflow (i.e. it is produced by your workflow), you can
use markdown to embed it in a CML report. For example, if `plot.png` is output
by `python train.py`, run:

```cli
$ echo '![](./plot.png)' >> report.md
$ cml comment create report.md
```

CML uploads local images like `plot.png` so they can be displayed in the
comment. The default server, `asset.cml.dev`, no longer accepts uploads: use
`--publish-native` on GitLab and Bitbucket, or your own image server on any
provider. See [Image Hosting](/doc/image-hosting).
