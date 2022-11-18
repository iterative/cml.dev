# CML with DVC

In many ML projects, data isn't stored in a Git repository and needs to be
downloaded from external sources. [DVC](https://dvc.org) is a common way to
bring data to your CML runner. DVC also lets you run pipelines and plot changes
in metrics for inclusion in CML reports.

<toggle>
<tab title="GitHub">

![](/img/dvc_cml_long_report.png 'GitHub DVC report example')

The `.github/workflows/cml.yaml` file to create this report is:

```yaml
name: CML & DVC
on: [push]
jobs:
  train-and-report:
    runs-on: ubuntu-latest
    # container: docker://ghcr.io/iterative/cml:0-dvc2-base1
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.pull_request.head.sha }}
      - uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - uses: iterative/setup-cml@v1
      - uses: iterative/setup-dvc@v1
      - name: Train model
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          pip install -r requirements.txt  # Install dependencies
          dvc pull data --run-cache        # Pull data & run-cache from S3
          dvc repro                        # Reproduce pipeline
      - name: Create CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          echo "## Metrics: workflow vs. main" >> report.md
          git fetch --depth=1 origin main:main

          dvc metrics diff master --show-md >> report.md
          echo "## Plots" >> report.md
          echo "### Class confusions" >> report.md
          dvc plots diff \
            --target classes.csv \
            --template confusion \
            -x actual \
            -y predicted \
            --show-vega master > vega.json
          vl2png vega.json -s 1.5 > plot.png
          echo '![](./plot.png "Confusion Matrix")' >> report.md

          echo "### Effects of regularization" >> report.md
          dvc plots diff \
            --target estimators.csv \
            -x Regularization \
            --show-vega master > vega.json
          vl2png vega.json -s 1.5 > plot-diff.png
          echo '![](./plot-diff.png)' >> report.md

          echo "### Training loss" >> report.md
          dvc plots diff \
            --target loss.csv --show-vega main > vega.json
          vl2png vega.json > plot-loss.png
          echo '![](./plot-loss.png "Training Loss")' >> report.md

          cml comment create report.md
```

See the [example repository](https://github.com/iterative/cml_dvc_case) for
more, or check out the
[use cases for machine learning](https://dvc.org/doc/use-cases/ci-cd-for-machine-learning).

## GitHub Actions: `setup-dvc`

The [iterative/setup-dvc](https://github.com/iterative/setup-dvc) action
installs DVC (similar to what [`setup-cml`](/doc/start/github#setup-action) does
for CML).

This action works on Ubuntu, macOS, and Windows runners. When running on
Windows, Python 3 should be setup first.

<toggle>
<tab title="Ubuntu & macOS">

```yaml
steps:
  - uses: actions/checkout@v3
    with:
      ref: ${{ github.event.pull_request.head.sha }}
  - uses: iterative/setup-dvc@v1
```

</tab>
<tab title="Windows">

```yaml
runs-on: windows-latest
steps:
  - uses: actions/checkout@v3
    with:
      ref: ${{ github.event.pull_request.head.sha }}
  - uses: actions/setup-python@v4
    with:
      python-version: '3.x'
  - uses: iterative/setup-dvc@v1
```

</tab>
</toggle>

A specific DVC version can be installed using the `version` argument (defaults
to the [latest release](https://github.com/iterative/dvc/releases)).

```yaml
- uses: iterative/setup-dvc@v1
  with:
    version: '1.0.1'
```

</tab>
<tab title="GitLab">

![](/img/github/dvc-report.png 'GitLab DVC report example')

The `.gitlab-ci.yml` file to create this report is:

```yaml
train-and-report:
  image: iterativeai/cml:0-dvc2-base1 # Python, DVC, & CML pre-installed
  script:
    - dvc pull data --run-cache # Pull data & run-cache from S3
    - pip install -r requirements.txt # Install dependencies
    - dvc repro # Reproduce pipeline

    # Create CML report
    - echo "## Metrics: workflow vs. main" >> report.md
    - git fetch --depth=1 origin main:main
    - dvc metrics diff --show-md main >> report.md

    - echo "## Plots" >> report.md
    - echo "### Training loss function diff" >> report.md
    - dvc plots diff --target loss.csv --show-vega main > vega.json
    - vl2png vega.json > plot.png
    - echo '![](./plot.png "Training Loss")' >> report.md

    - cml comment create report.md
```

See the [example repository](https://gitlab.com/iterative.ai/cml-dvc-case) for
more, or check out the
[use cases for machine learning](https://dvc.org/doc/use-cases/ci-cd-for-machine-learning).

</tab>
</toggle>

## Cloud Storage Provider Credentials

There are many
[supported could storage providers](https://dvc.org/doc/command-reference/remote/modify#available-parameters-per-storage-type).
Authentication credentials can be provided via environment variables. Here are a
few examples for some of the most frequently used providers:

<toggle>
<tab title="S3 & compatible (Minio, DigitalOcean Spaces, IBM Cloud Object Storage, ...)">

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` **(optional)**

</tab>
<tab title="Azure">

- `AZURE_STORAGE_CONNECTION_STRING`
- `AZURE_STORAGE_CONTAINER_NAME`

</tab>
<tab title="Aliyun">

- `OSS_BUCKET`
- `OSS_ACCESS_KEY_ID`
- `OSS_ACCESS_KEY_SECRET`
- `OSS_ENDPOINT`

</tab>
<tab title="Google Cloud Storage">

- `GOOGLE_APPLICATION_CREDENTIALS`: the **path** to a service account JSON file

</tab>
<tab title="Google Drive">

- `GDRIVE_CREDENTIALS_DATA`: the **contents** of a service account JSON file.
  See how to
  [setup a Google Drive DVC remote](https://dvc.org/doc/user-guide/setup-google-drive-remote#authorization)
  for more information.

</tab>
</toggle>

## Runner Access Permissions

When using object storage remotes (like AWS `s3` or GCP `gs`) with
[`cml runner`](/doc/self-hosted-runners), DVC can be granted fine-grained
access. Instead of resorting to dedicated credentials & managing additional
keys,
[the `--cloud-permission-set` option](/doc/ref/runner#example-using---cloud-permission-set)
provides granular control.

Networking cost and transfer time can also be reduced using an appropriate
[`--cloud-region`](/doc/ref/runner#--cloud-region). For example, AWS has
[free network transfers](https://aws.amazon.com/s3/pricing/) from a DVC remote
`s3` to a CML runner `ec2` instance within the same region.

<toggle>
<tab title="AWS">

```cli
$ cml runner launch \
  --cloud=aws \
  --cloud-region=us-west \
  --cloud-type=m+t4 \
  --cloud-permission-set=arn:aws:iam::1234567890:instance-profile/dvc-s3-access \
  --labels=cml-gpu
```

</tab>
<tab title="GCP">

```cli
$ cml runner launch \
  --cloud=gcp \
  --cloud-region=us-west \
  --cloud-type=m+t4 \
  --cloud-permission-set=dvc-sa@myproject.iam.gserviceaccount.com,scopes=storage-rw \
  --labels=cml-gpu
```

</tab>
</toggle>
