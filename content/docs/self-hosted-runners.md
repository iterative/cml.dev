# Self-hosted (On-premise or Cloud) Runners

GitHub Actions and GitLab CI workflows are run on GitHub- and GitLab- hosted
runners by default. However, there are many great reasons to use your own
runners: to take advantage of GPUs, orchestrate your team's shared computing
resources, or train in the cloud.

☝️ **Tip!** Check out the official documentation from
[GitHub](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners)
and [GitLab](https://docs.gitlab.com/runner) for more information on self-hosted
runners.

⚠️ Using
[self-hosted runners for Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/runners)
is not yet supported.

## Allocating Cloud Compute Resources with CML

When a workflow requires computational resources (such as GPUs), CML can
automatically allocate cloud instances using `cml runner`. You can spin up
instances on AWS, Azure, GCP, or Kubernetes
([see below](#cloud-compute-resource-credentials)). Alternatively, you can
connect
[any other compute provider or on-premise (local) machine](#on-premise-local-runners).

For example, the following workflow deploys a `p2.xlarge` instance on AWS EC2
and trains a model on the instance. After the job runs, the instance
automatically shuts down.

You might notice that this workflow is quite similar to the
[basic use case](/doc/usage). The only addition is `cml runner` and a few
environment variables for passing your cloud compute credentials to the
workflow.

Note that `cml runner` will also automatically restart your jobs (whether from a
[GitHub Actions 72-hour timeout](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#usage-limits)
or a
[AWS EC2 spot instance interruption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html)).

<toggle>
<tab title="GitHub">

```yaml
name: CML
on: [push]
jobs:
  deploy-runner:
    runs-on: ubuntu-latest
    steps:
      - uses: iterative/setup-cml@v1
      - uses: actions/checkout@v2
      - name: Deploy runner on EC2
        env:
          REPO_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          cml runner \
              --cloud=aws \
              --cloud-region=us-west \
              --cloud-type=p2.xlarge \
              --labels=cml-gpu
  train-model:
    needs: deploy-runner
    runs-on: [self-hosted, cml-gpu]
    timeout-minutes: 4320 # 72h
    container:
      image: docker://iterativeai/cml:0-dvc2-base1-gpu
      options: --gpus all
    steps:
      - uses: actions/checkout@v2
      - name: Train model
        env:
          REPO_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
        run: |
          pip install -r requirements.txt
          python train.py

          # Create CML report
          cat metrics.txt >> report.md
          cml publish plot.png --md --title="Confusion Matrix" >> report.md
          cml send-comment report.md
```

</tab>
<tab title="GitLab">

```yaml
deploy-runner:
  image: iterativeai/cml:0-dvc2-base1
  script:
    - |
      cml runner \
          --cloud=aws \
          --cloud-region=us-west \
          --cloud-type=p2.xlarge \
          --cloud-spot \
          --labels=cml-gpu
train-model:
  needs: [deploy-runner]
  tags:
    - cml-gpu
  image: iterativeai/cml:0-dvc2-base1-gpu
  script:
    - pip install -r requirements.txt
    - python train.py
  image: iterativeai/cml:0-dvc2-base1
  script:
    - pip install -r requirements.txt
    - python train.py

    # Create CML report
    - cat metrics.txt >> report.md
    - cml publish plot.png --md --title="Confusion Matrix" >> report.md
    - cml send-comment report.md
```

</tab>
</toggle>

In the workflow above, the `deploy-runner` step launches an EC2 `p2.xlarge`
instance in the `us-west` region. The `train-model` job then runs on the
newly-launched instance. See [Environment Variables](#environment-variables)
below for details on the `secrets` required.

🎉 **Note that jobs can use any Docker container!** To use commands such as
`cml send-comment` from a job, the only requirement is to
[have CML installed](/doc/install).

## Docker Images

The CML Docker images (`docker://iterativeai/cml` or
`docker://ghcr.io/iterative/cml`) come loaded with Python, CUDA, `git`, `node`
and other essentials for full-stack data science. Different versions of these
essentials are available from different `iterativeai/cml` image tags. The tag
convention is `{CML_VER}-dvc{DVC_VER}-base{BASE_VER}{-gpu}`:

| `{BASE_VER}` | Software included (`-gpu`)                      |
| ------------ | ----------------------------------------------- |
| 0            | Ubuntu 18.04, Python 2.7 (CUDA 10.1, CuDNN 7)   |
| 1            | Ubuntu 20.04, Python 3.8 (CUDA 11.0.3, CuDNN 8) |

For example, `docker://iterativeai/cml:0-dvc2-base1-gpu`, or
`docker://ghcr.io/iterative/cml:0-dvc2-base1`.

## Options

The `cml runner` command supports many options (see the
[command reference](/doc/ref/runner)). Notable options are:

- `--labels=<...>`: One or more (comma-delimited) labels (e.g. `cml,gpu`).
- `--idle-timeout=<seconds>`: Seconds to wait for jobs before terminating.
- `--single`: Terminate runner after one workflow run.
- `--reuse`: Don't launch a new runner if an existing one has the same name or
  overlapping labels.
- `--cloud={aws,azure,gcp,kubernetes}`: Cloud compute provider to host the
  runner.
- `--cloud-type={m,l,xl,m+k80,m+v100,...}`: Instance
  [type](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#machine-type).
  Also accepts native types such as `t2.micro`.
- `--cloud-gpu={nogpu,k80,v100,tesla}`: GPU type.
- `--cloud-hdd-size=<...>`: Disk storage in GB.
- `--cloud-spot`: Request a preemptible spot instance.
- `--cloud-spot-price=<...>`: Maximum spot instance USD bidding price.
- `--cloud-region={us-west,us-east,eu-west,eu-north,...}`:
  [Region](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#cloud-regions)
  where the instance is deployed. Also accepts native AWS/Azure region or GCP
  zone.
- `--cloud-permission-set=<...>`:
  [AWS instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile)
  or
  [GCP instance service account](https://cloud.google.com/compute/docs/access/service-accounts).

☝️ **Tip!** Check out the full
[`cml runner` command reference](/doc/ref/runner).

## Environment Variables

Sensitive values like cloud and repository credentials can be provided through
environment variables with the aid of GitHub
[secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
or GitLab
[masked variables](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project);
the latter also supports
[external secrets](https://docs.gitlab.com/ee/ci/secrets) for added security.

⚠️ You will need to create a
[personal access token (PAT)](#personal-access-token) with repository read/write
access. In the example workflow above, this token is stored as
`PERSONAL_ACCESS_TOKEN`.

🛈 If using the `--cloud` option, you will also need to provide access
credentials for your cloud compute resources as secrets. In the above example,
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (with privileges to create &
destroy EC2 instances) are required.

### Personal Access Token

This token serves as a repository access credential, and is especially required
for `cml runner` to function.

<toggle>
<tab title="GitHub">

Use either:

- a
  [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
  with the `repo` scope, or
- a [GitHub App] with the appropriate permissions (see [below](#app))

[github app]:
  https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps

Ideally, you should not use personal access tokens from your own account, as
they grant access to all your repositories. Instead, it's highly recommended to
create a separate _bot account_ that only has access to the repositories where
you plan to deploy runners to. Bot accounts are
[the same](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#personal-user-accounts)
as normal user accounts, with the only difference being the intended use case.

#### PAT

For instance, to use a personal access token:

1. [Generate a new personal access token](https://github.com/settings/tokens/new)
   under GitHub developer settings
   - in the "Note" field, type `PERSONAL_ACCESS_TOKEN`
   - select `repo` scope
   - click "Generate token" and copy it
2. In you GitHub repository and/or organization, navigate to **Settings**
   &rightarrow; **Secrets** &rightarrow; **New repository/organization secret**
   - in the "Name" field, type `PERSONAL_ACCESS_TOKEN`
   - in the "Value" field, paste the token
   - click "Add secret"

Step 2 can also be used for adding other secrets such as cloud access
credentials.

#### App

Alternatively, a [GitHub App] ID (`CML_GITHUB_APP_ID`) and private key
(`CML_GITHUB_APP_PEM`) can be used to generate a token on-the-fly, as shown in
the example below:

```yaml
steps:
  - uses: navikt/github-app-token-generator@v1
    id: get-token
    with:
      private-key: ${{ secrets.CML_GITHUB_APP_PEM }}
      app-id: ${{ secrets.CML_GITHUB_APP_ID }}
  - uses: actions/checkout@v2
    with:
      token: ${{ steps.get-token.outputs.token }}
  - name: Train model
    env:
      REPO_TOKEN: ${{ steps.get-token.outputs.token }}
    run: |
      ...
      cml send-comment report.md
```

Note that the Apps require the following **write**
[permissions](https://docs.github.com/en/developers/apps/building-github-apps/setting-permissions-for-github-apps):

- Repository permissions (if used on a per-repo basis)
  - Administration (`cml runner`)
  - Checks (`cml send-github-check`)
  - Pull requests (`cml {pr,send-comment}`)
- Organization permissions (if used on an org)
  - Self-hosted runners (`cml runner`)

</tab>
<tab title="GitLab">

Use either:

- a
  [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
  with the `api`, `read_repository` and `write_repository` scopes, or
- a
  [project access token](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html).
  This only works for project-level
  ([specific](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#specific-runners)),
  but not for instance-level
  ([shared](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#shared-runners))
  runners.

For instance, to use a personal access token:

1. Navigate to **User Settings** &rightarrow; **Access Tokens**
   - in the "Name" field, type `REPO_TOKEN`
   - select `api`, `read_repository` and `write_repository`
   - click "Create personal access token" and copy it
2. In your GitLab project, navigate to **Settings** &rightarrow; **CI/CD**
   &rightarrow; **Variables** &rightarrow; **Add Variable**
   - in the "Key" field, type `REPO_TOKEN`
   - in the "Value" field, paste your Personal Access Token
   - select "Mask variable"
   - deselect "Protect variable"
   - click "Add variable" at the bottom of the dialog box

Step 2 can also be used for adding other masked variables such as cloud access
credentials.

</tab>
<tab title="Bitbucket">

Bitbucket Cloud does not use access tokens. Instead, create a `REPO_TOKEN`
variable with a Base64 encoded username and password.

Use either:

- your username and a
  [Bitbucket Cloud App Password](https://bitbucket.org/account/settings/app-passwords/)
  with `Write` permission for Pull requests, Pipelines, and Runners, or
- create a designated "CI/CD" _bot account_ for CML authentication. Bot accounts
  are the same as normal user accounts, with the only difference being the
  intended use case: you limit the account to only access the repositories where
  you plan to deploy runners to.

In either case, the steps to create a `REPO_TOKEN` are:

1. Use a Base64 encoder of your choice to encode a Bitbucket username and
   password:
   - `echo -n $USERNAME:$PASSWORD | base64`. The `-n` ensures the base64 does
     not contain the trailing newline that `echo` adds by default.
   - copy the resulting Base64 token
2. In your repository, go to **Repository Settings** &rightarrow; **Repository
   Variables**
   - in the "Name" field, type `REPO_TOKEN`
   - in the "Value" field, paste the Base64 token
   - select `Secured` to hide credentials in all Bitbucket logs

Step 2 can also be used for adding other secured variables such as cloud access
credentials.

</tab>
</toggle>

## Cloud Compute Resource Credentials

Note that you will also need to provide access credentials of your compute
resources. In the above example, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
are required to deploy EC2 instances.

Click below to see credentials needed for supported compute providers.

<toggle>
<tab title="AWS">

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` **(optional)**

See the
[AWS credentials docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)
for obtaining these keys.

☝️ **Note** The same credentials can also be used for
[configuring cloud storage](/doc/cml-with-dvc#cloud-storage-provider-credentials).

</tab>
<tab title="Azure">

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_TENANT_ID`

</tab>
<tab title="GCP">

Either one of:

- `GOOGLE_APPLICATION_CREDENTIALS_DATA`: the **contents** of a service account
  JSON file, or
- `GOOGLE_APPLICATION_CREDENTIALS`: the **path** to the JSON file.

The former is more convenient for CI/CD scenarios, where secrets are (usually)
provisioned through environment variables instead of files.

</tab>
<tab title="Kubernetes">

- `KUBERNETES_CONFIGURATION`: the **contents** of a
  [`kubeconfig`](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig)
  file.

</tab>
</toggle>

## On-premise (Local) Runners

The `cml runner` command can also be used to manually set up a local machine,
on-premise GPU cluster, or any other cloud compute resource as a self-hosted
runner. Simply [install CML](/doc/install) and then run:

```bash
cml runner \
  --repo="$REPOSITORY_URL" \
  --token="$PERSONAL_ACCESS_TOKEN" \
  --labels="local,runner" \
  --idle-timeout=180
```

The machine will listen for jobs from your repository and execute them locally.

⚠️ **Warning:** anyone with access to your repository (everybody for public
ones) may be able to execute arbitrary code on your machine. Refer to the
corresponding
[GitHub](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#hardening-for-self-hosted-runners)
and [GitLab](https://docs.gitlab.com/runner/security) documentation for
additional guidance.

## Debugging 

For issuses creating the `cml runner` instance you can provide an environment variable `TF_LOG_PROVIDER=DEBUG` as terraform is used internally to create the instance.

In very rare cases, you may need to cleanup CML cloud resources manually.
An example of such a problem can be seen
[when an EC2 instance ran out of storage space](https://github.com/iterative/cml/issues/1006).

The following is a list of all the resources you may need to
manually cleanup in the case of a failure:

- The running instance (named with pattern `cml-{random-id}`)
- The volume attached to the running instance
  (this should delete itself after terminating the instance)
- The generated key-pair (named with pattern `cml-{random-id}`)

If you encounter these edge cases create a [GitHub Issue with as much detail as possible](https://github.com/iterative/cml/issues/new). If possible link your workflow in the issue or provide an example of your worflow's YAML. 

Additionally, try to capture and include logs from the instance:

For easy local access and debugging on the `cml runner` instance [check our example on using the --cloud-startup-script option](/doc/ref/runner#Using--cloud-startup-script).

Then you can run the following:
```bash
ssh ubuntu@instance_public_ip
sudo journalctl -n all -u cml.service --no-pager > cml.log
sudo dmesg --ctime > system.log
```

☝️ **Note** Please give your `cml.log` a visual scan, entries like IP addresses
and git repository names may be present and considered sensitive in some cases.

You can then copy those logs to your local machine with:

```bash
scp ubuntu@instance_public_ip:~/cml.log .
scp ubuntu@instance_public_ip:~/system.log .
```

There is a chance that the instance could be severely broken if the SSH command
hangs -- if that happens reboot it from the web console and try the commands
again.