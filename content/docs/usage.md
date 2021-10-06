# Using CML

A GitLab, GitHub, or Bitbucket account is required. Familiarity with
[Github Actions](https://help.github.com/en/actions) or
[GitLab CI/CD](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration)
may also be beneficial.

## GitLab

Please see our docs on
[CML with GitLab CI/CD](https://github.com/iterative/cml/wiki/CML-with-GitLab)
and in particular the
[personal access token](https://github.com/iterative/cml/wiki/CML-with-GitLab#variables)
requirement.

## Bitbucket

Please see our docs on
[CML with Bitbucket Cloud](https://github.com/iterative/cml/wiki/CML-with-Bitbucket-Cloud).
_Bitbucket Server support estimated to arrive by mid 2021._

## GitHub

The key file in any CML project is `.github/workflows/cml.yaml`:

```yaml
name: CML
on: [push]
jobs:
  run:
    runs-on: ubuntu-latest
    # optionally use a convenient Ubuntu LTS + DVC + CML container
    # container: docker://ghcr.io/iterative/cml:0-dvc2-base1
    steps:
      - uses: actions/checkout@v2
      # may need to setup Node.js & Python3 on e.g. self-hosted
      # - uses: actions/setup-node@v2
      #   with:
      #     node-version: '12'
      # - uses: actions/setup-python@v2
      #   with:
      #     python-version: '3.x'
      - uses: iterative/setup-cml@v1
      - name: Train model
        run: |
          # Your ML workflow goes here
          pip install -r requirements.txt
          python train.py
      - name: Create CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Post reports as comments in GitHub PRs
          cat results.txt >> report.md
          cml send-comment report.md
```

We helpfully provide CML and other useful libraries pre-installed on our
[custom Docker images](/doc/self-hosted-runners#docker-images). In the above
example, uncommenting the
`container: docker://ghcr.io/iterative/cml:0-dvc2-base1` field will make the
runner pull the CML Docker image. The image already has Node.js, Python 3, DVC
and CML set up on an Ubuntu LTS base for convenience.

## CML Commands

CML provides a number of commands to help package the outputs of ML workflows
(including numeric data and visualizations about model performance) into a CML
report.

Below is a list of CML commands for starting cloud compute runners, writing and
publishing markdown reports to your CI/CD system.

∞ **[`runner`](/doc/ref/runner)**\
Launch a runner hosted by a cloud compute provider or locally on-premise (see [self-hosted runners](/doc/self-hosted-runners))\
e.g. `cml runner --cloud={aws,azure,gcp,kubernetes} ...`

∞ **[`publish`](/doc/ref/publish)**\
Publicly host an image for displaying in a CML report\
e.g. `cml publish plot.png --md >> report.md`

∞ **[`pr`](/doc/ref/pr)**\
Commit specified files to a new branch and create a pull request\
e.g. `cml pr "**/*.json" "**/*.py" --md >> report.md`

∞ **[`send-comment`](/doc/ref/send-comment)**\
Post a markdown report as a commit comment\
e.g. `cml send-comment report.md`

∞ **[`send-github-check`](/doc/ref/send-github-check)**\
Post a markdown report as a GitHub check\
e.g. `cml send-github-check report.md`

∞ **[`tensorboard-dev`](/doc/ref/tensorboard-dev)**\
Return a link to a <https://tensorboard.dev> page\
e.g. `cml tensorboard-dev --logdir=./logs --md >> report.md`

### CML Reports

The `cml send-comment` command can be used to post reports. CML reports are
written in markdown ([GitHub](https://github.github.com/gfm),
[GitLab](https://docs.gitlab.com/ee/user/markdown.html), or
[Bitbucket](https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html)
flavors). That means they can contain images, tables, formatted text, HTML
blocks, code snippets and more — really, what you put in a CML report is up to
you. Some examples:

📝 **Text** Write to your report using whatever method you prefer. For example,
copy the contents of a text file containing the results of ML model training:

```bash
cat results.txt >> report.md
```

🖼️ **Images** Display images using the markdown or HTML. Note that if an image
is an output of your ML workflow (i.e., it is produced by your workflow), you
will need to use the `cml publish` command to include it a CML report. For
example, if `plot.png` is output by `python train.py`, run:

```bash
cml publish plot.png --md >> report.md
```
