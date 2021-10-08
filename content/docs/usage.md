# Using CML

A GitLab, GitHub, or Bitbucket account is required. Familiarity with
[Github Actions](https://help.github.com/en/actions) or
[GitLab CI/CD](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration)
may also be beneficial.

<toggle>
<tab title="GitHub">

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

</tab>
<tab title="GitLab">

## GitLab

The key file in any GitLab CI/CD project is `.gitlab-ci.yml`:

```yml
# .gitlab-ci.yml
stages:
  - Train model
cml:
  stage: Train model
  image: iterativeai/cml:0-dvc2-base1
  script:
    - pip3 install -r requirements.txt
    - python train.py

    # Create CML report
    - cat metrics.txt >> report.md
    - cml publish confusion_matrix.png --md >> report.md
    - cml send-comment report.md
```

The example above generates visual reports in a merge request
![](/img/GitLab_CML_report.png '=400')

Note that you _must_ create
[personal or project access token (PAT)](/doc/self-hosted-runners#personal-access-token)
and save it in a `repo_token` variable.

### Using self-hosted runners

[Follow GitLab's instructions](https://gitlab.com/andronovhopf/prettypretty/-/settings/ci_cd)
to set up a runner manually or with a Kubernetes cluster.

### Example projects

- [Basic CML project](https://gitlab.com/iterative.ai/cml-base-case)
- [CML with DVC to pull data](https://gitlab.com/iterative.ai/cml-dvc-case)
- [CML with Tensorboard](https://gitlab.com/iterative.ai/cml-tensorboard-case)
- [CML with EC2 GPU](https://gitlab.com/iterative.ai/cml-cloud-case)

</tab>
<tab title="Bitbucket">

## Bitbucket

CML now works with Bitbucket Cloud! Here, we'll show you how.

_Bitbucket Server support estimated to arrive by mid 2022._

In Bitbucket Cloud, you can use the
[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) CI/CD
system to run workflows automatically on triggering events. When your workflow
includes a CML report, you'll see it appear as a comment on the corresponding
commit- like the report below:

The key file in any Bitbucket Pipeline project is `bitbucket-pipelines.yml`:

```yaml
image: iterativeai/cml:0-dvc2-base1
pipelines:
  default:
    - step:
        name: Train model
        script:
          - pip install -r requirements.txt
          - python train.py
    - step:
        name: Create CML report
        script:
          - cat metrics.txt > report.md
          - echo >> report.md
          - cml publish confusion_matrix.png --md >> report.md
          - cml send-comment report.md
```

The example above generates visual reports in a pull request
![](/img/bitbucket_cloud_pr.png '=600')

To see this CML report in context,
[check out our project repo](https://bitbucket.org/iterative-ai/cml-base-case/pull-requests/2).

### Repository variables

You'll need to create a variable called `repo_token` so CML can authenticate
with the Bitbucket Cloud API. Because the API requires a username and password,
you have two options:

1. Use the access credentials from a user on your team (note that you may also
   consider using
   [Bitbucket Cloud App Passwords](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)
   to generate a password just for CML, if you would prefer).
2. Create a designated "CI/CD" account to author CML reports.

Whichever you choose, the steps to create your `repo_token` will be the same:

1. Use a Base64 encoder of your choice to encode your username and password:
   `printf $USERNAME:$PASSWORD | base64`. Copy the resulting token.
2. In your repository, go to **Repository Settings** -> **Repository
   Variables**.
3. In the field "Name", enter `repo_token`.
4. In the field "Value", enter your Base64 transformed string.
5. Check `Secured` to ensure that your credentials are hidden in all Bitbucket
   Pipelines logs.

### Self-hosted runners

At this time, Bitbucket Pipelines do not support self-hosted runners. Please
[see their official docs](https://bitbucket.org/product/features/pipelines) to
learn more about pricing options if you have significant computing needs.

### Example projects

- [Basic CML project](https://bitbucket.org/iterative-ai/cml-base-case)

</tab>
</toggle>

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
