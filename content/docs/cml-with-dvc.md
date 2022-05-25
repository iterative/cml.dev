# CML with DVC

In many ML projects, data isn't stored in a Git repository and needs to be
downloaded from external sources. [DVC](https://dvc.org) is a common way to
bring data to your CML runner. DVC also lets you run pipelines and plot changes
in metrics for inclusion in CML reports.

![](/img/dvc_cml_long_report.png)

The `.github/workflows/cml.yaml` file to create this report is:

```yaml
name: CML & DVC
on: [push]
jobs:
  run:
    runs-on: ubuntu-latest
    container: docker://ghcr.io/iterative/cml:0-dvc2-base1
    steps:
      - uses: actions/checkout@v2
      - name: Train model
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          cml ci --unshallow
          pip install -r requirements.txt  # Install dependencies
          dvc pull data --run-cache        # Pull data & run-cache from S3
          dvc repro                        # Reproduce pipeline
      - name: Create CML report
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          echo "## Metrics" >> report.md
          dvc metrics diff master --show-md >> report.md

          # Publish confusion matrix diff
          echo "## Plots" >> report.md
          echo "### Class confusions" >> report.md
          dvc plots diff \
            --target classes.csv \
            --template confusion \
            -x actual \
            -y predicted \
            --show-vega master > vega.json
          vl2png vega.json -s 1.5 > plot.png
          cml publish --md plot.png >> report.md

          # Publish regularization function diff
          echo "### Effects of regularization" >> report.md
          dvc plots diff \
            --target estimators.csv \
            -x Regularization \
            --show-vega master > vega.json
          vl2png vega.json -s 1.5 > plot.png
          cml publish --md plot.png >> report.md

          cml send-comment report.md
```

See the [example repository](https://github.com/iterative/cml_dvc_case) for
more, or check out the
[use cases for machine learning](https://dvc.org/doc/use-cases/ci-cd-for-machine-learning).

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

## Accessing DVC remotes on your CML cloud runner

If you're using an Object Storage remotes like `s3` or `gs` from AWS/GCP it's
easy to allow DVC programatic access without the use of dedicated credentials.

Besides reducing overhead in managing additional keys, you can save in
networking costs, and have options to increase transfer speeds. For example,
looking at AWS, we can get
[free network transfers](https://aws.amazon.com/s3/pricing/) from `s3` to `ec2`
within the same region. So be sure to use `--cloud-region` that is in the same
region as your DVC remote


These `cml runner` commands fit right in with the above examples. For a more
detailed breakdown checkout
[the `--cloud-permission-set` option](/doc/ref/runner#using---cloud-permission-set).

<toggle>
<tab title="AWS">

```bash
cml runner \
  --cloud=aws \
  --cloud-region=us-west \
  --cloud-type=p2.xlarge \
  --cloud-permission-set=arn:aws:iam::1234567890:instance-profile/dvc-s3-access \
  --labels=cml-gpu
```

</tab>

<tab title="GCP">

```bash
cml runner \
  --cloud=gcp \
  --cloud-region=us-west \
  --cloud-type=m+v100 \
  --cloud-permission-set=dvc-sa@myproject.iam.gserviceaccount.com,scopes=storage-rw \
  --labels=cml-gpu
```

</tab>
</toggle>

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
  - uses: actions/checkout@v2
  - uses: iterative/setup-dvc@v1
```

</tab>
<tab title="Windows">

```yaml
runs-on: windows-latest
steps:
  - uses: actions/checkout@v2
  - uses: actions/setup-python@v2
    with:
      python-version: '3.x'
  - uses: iterative/setup-dvc@v1
```

</tab>
</toggle>

A specific DVC version can installed using the `version` argument (defaults to
the [latest release](https://github.com/iterative/dvc/releases)).

```yaml
- uses: iterative/setup-dvc@v1
  with:
    version: '1.0.1'
```
