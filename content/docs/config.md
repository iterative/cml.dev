# CML Configuration

A GitLab, GitHub, or Bitbucket account is required. Familiarity with
[GitHub Actions](https://help.github.com/en/actions),
[GitLab CI/CD](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration),
or [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) may
also be beneficial.

<toggle>
<tab title="GitHub">

The CML config file is `.github/workflows/cml.yaml`:

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
      # - uses: actions/setup-node@v2
      #   with:
      #     node-version: '16'
      # - uses: actions/setup-python@v4
      #   with:
      #     python-version: '3.x'
      - uses: iterative/setup-cml@v1
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.pull_request.head.sha }}
      - name: Train model
        run: |
          # Your ML workflow goes here
          pip install -r requirements.txt
          python train.py  # generate plot.png
      - name: Create CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
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

The CML config file is `.gitlab-ci.yml`:

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
    - cml comment create report.md
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

The CML config file is `bitbucket-pipelines.yml`:

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
          - cml comment create report.md
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

### Example project

- [Basic CML project](https://bitbucket.org/iterative-ai/cml-base-case)

</tab>
</toggle>
