# Using CML

You'll need a GitLab, GitHub, or Bitbucket account to begin. Users may wish to
familiarize themselves with [Github Actions](https://help.github.com/en/actions)
or
[GitLab CI/CD](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration).
Here, will discuss the GitHub use case.

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
name: your-workflow-name
on: [push]
jobs:
  run:
    runs-on: ubuntu-latest
    # optionally use a convenient Ubuntu LTS + CUDA + DVC + CML image
    # container: docker://iterativeai/cml:0-dvc2-base1-gpu
    # container: docker://ghcr.io/iterative/cml:0-dvc2-base1-gpu
    steps:
      - uses: actions/checkout@v2
      # may need to setup NodeJS & Python3 on e.g. self-hosted
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
      - name: Write CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Post reports as comments in GitHub PRs
          cat results.txt >> report.md
          cml-send-comment report.md
```

We helpfully provide CML and other useful libraries pre-installed on our
[custom Docker images](/doc/self-hosted-runners#docker-images). In the above
example, uncommenting the field
`container: docker://iterativeai/cml:0-dvc2-base1-gpu` (or
`container: docker://ghcr.io/iterative/cml:0-dvc2-base1-gpu`) will make the
runner pull the CML Docker image. The image already has NodeJS, Python 3, DVC
and CML set up on an Ubuntu LTS base with CUDA libraries and
[Terraform](https://www.terraform.io) installed for convenience.

## CML Functions

CML provides a number of functions to help package the outputs of ML workflows
(including numeric data and visualizations about model performance) into a CML
report.

Below is a table of CML functions for writing markdown reports and delivering
those reports to your CI system.

| Function                | Description                                                      | Example Inputs                                              |
| ----------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| `cml-runner`            | Launch a runner locally or hosted by a cloud provider            | See [Arguments](https://github.com/iterative/cml#arguments) |
| `cml-publish`           | Publicly host an image for displaying in a CML report            | `<path to image> --title <image title> --md`                |
| `cml-send-comment`      | Return CML report as a comment in your GitLab/GitHub workflow    | `<path to report> --head-sha <sha>`                         |
| `cml-send-github-check` | Return CML report as a check in GitHub                           | `<path to report> --head-sha <sha>`                         |
| `cml-pr`                | Commit the given files to a new branch and create a pull request | `<path>...`                                                 |
| `cml-tensorboard-dev`   | Return a link to a Tensorboard.dev page                          | `--logdir <path to logs> --title <experiment title> --md`   |

### CML Reports

The `cml-send-comment` command can be used to post reports. CML reports are
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
will need to use the `cml-publish` function to include it a CML report. For
example, if `graph.png` is output by `python train.py`, run:

```bash
cml-publish graph.png --md >> report.md
```
