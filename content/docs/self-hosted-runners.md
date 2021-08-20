# Self-hosted Runners

GitHub Actions and GitLab CI are run on GitHub- and GitLab- hosted runners by
default. However, there are many great reasons to use your own runners: to take
advantage of GPUs; to orchestrate your team's shared computing resources, or to
train in the cloud.

☝️ **Tip!** Check out the official documentation from
[GitHub](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners)
and [GitLab](https://docs.gitlab.com/runner/) to get started setting up your
self-hosted runner.

## Allocating cloud resources with CML

When a workflow requires computational resources (such as GPUs) CML can
automatically allocate cloud instances using `cml-runner`. You can spin up
instances on your AWS or Azure account (GCP support is forthcoming!).

For example, the following workflow deploys a `t2.micro` instance on AWS EC2 and
trains a model on the instance. After the job runs, the instance automatically
shuts down. You might notice that this workflow is quite similar to the
[basic use case](#usage) highlighted in the beginning of the docs- that's
because it is! What's new is that we've added `cml-runner`, plus a few
environmental variables for passing your cloud service credentials to the
workflow.

```yaml
name: 'Train-in-the-cloud'
on: [push]

jobs:
  deploy-runner:
    runs-on: [ubuntu-latest]
    steps:
      - uses: iterative/setup-cml@v1
      - uses: actions/checkout@v2
      - name: 'Deploy runner on EC2'
        shell: bash
        env:
          REPO_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          cml-runner \
          --cloud aws \
          --cloud-region us-west \
          --cloud-type=t2.micro \
          --labels=cml-runner
  model-training:
    needs: deploy-runner
    runs-on: [self-hosted, cml-runner]
    container: docker://iterativeai/cml:0-dvc2-base1
    steps:
      - uses: actions/checkout@v2
      - name: 'Train my model'
        env:
          repo_token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
        run: |
          pip install -r requirements.txt
          python train.py

          # Publish report with CML
          cat metrics.txt > report.md
          cml-send-comment report.md
```

In the above workflow, the step `deploy-runner` launches an EC2 `t2-micro`
instance in the `us-west` region. The next step, `model-training`, runs on the
newly launched instance.

**Note that you can use any container with this workflow!** While you must have
CML and its dependencies setup to use CML functions like `cml-send-comment` from
your instance, you can create your favorite training environment in the cloud by
pulling the Docker container of your choice.

We like the
[CML container](https://github.com/iterative/cml/blob/master/Dockerfile)
(`docker://iterativeai/cml:0-dvc2-base1`) because it comes loaded with Python,
Git, Node JS and other essentials for full-stack data science. But we don't mind
if you do it your way :)

## Options

The function `cml-runner` accepts the following arguments:

| Name                              | Default                                                    | Description                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--version`                       | N/A                                                        | Show version number and exit (ignoring all other options)                                                                                             |
| `--labels <list>`                 | `cml`                                                      | One or more user-defined labels for this runner (delimited with commas)                                                                               |
| `--idle-timeout <seconds>`        | `300`                                                      | Seconds to wait for jobs before shutting down. Set to -1 to disable timeout                                                                           |
| `--name <string>`                 | `cml-{identifier}` where `{identifier}` is a random string | Name displayed in the repository once registered                                                                                                      |
| `--single`                        | N/A                                                        | Exit after running a single job                                                                                                                       |
| `--reuse`                         | N/A                                                        | Don't launch a new runner if an existing one has the same name or overlapping labels                                                                  |
| `--driver <platform>`             | Inferred from environment variables                        | Platform where the repository is hosted. Accepts `github` or `gitlab`                                                                                 |
| `--repo <URL>`                    | Inferred from environment variables                        | Git repository URL e.g. https://github.com/iterative/cml                                                                                              |
| `--token <token>`                 | Inferred from environment variables                        | Personal access token with enough permissions to register a self-hosted runner on the repository                                                      |
| `--cloud <vendor>`                | N/A                                                        | Cloud provider to deploy the runner. Accepts `aws` or `azure`. If not set, the runner will be deployed locally and `--cloud-` options will be ignored |
| `--cloud-region <region>`         | `us-west`                                                  | Region where the instance is deployed. Accepts `us-east`, `us-west`, `eu-west`, `eu-north` or native regions                                          |
| `--cloud-type <type>`             | N/A                                                        | Instance type. Accepts `m`, `l`, `xl` or native types like `t2.micro`                                                                                 |
| `--cloud-gpu <type>`              | `nogpu`                                                    | GPU type. Accepts `nogpu`, `k80` or `tesla`.                                                                                                          |
| `--cloud-hdd-size <gigabytes>`    | N/A                                                        | Storage size in GB                                                                                                                                    |
| `--cloud-ssh-private <key>`       | Automatically generated throwaway key                      | Custom private RSA SSH key                                                                                                                            |
| `--cloud-spot`                    | N/A                                                        | Request a spot instance. If not set, `--cloud-spot-price` won't have any effect                                                                       |
| `--cloud-spot-price <usd>`        | Current spot bidding price                                 | Maximum spot instance bidding price in USD                                                                                                            |
| `--cloud-startup-script <base64>` | N/A                                                        | Run the provided Base64-encoded Linux shell script during the instance initialization                                                                 |
| `-h`                              | N/A                                                        | Show this help menu and exit                                                                                                                          |

## Environment variables

Sensitive values like cloud and repository credentials can be provided through
environment variables with the aid of GitHub
[secrets](https://docs.github.com/es/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
or GitLab
[masked variables](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project);
the latter also supports
[external secrets](https://docs.gitlab.com/ee/ci/secrets) for added security.

When invoking the `cml-runner` command, you will need use environment variables
to provide the following secrets:

- A personal access token to register and remove self-hosted runners from your
  repositories
- Cloud credentials to create and destroy cloud resources, only when used in
  conjunction with the `--cloud` option

### Personal access token

<details>

#### GitHub

You can either
[create a personal access token](https://docs.github.com/en/github-ae@latest/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
with the `repo` scope or a
[GitHub App](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps)
with **Repository permissions / Administration** write permissions (for
repository-level runners), or **Organization permissions / Self-hosted runners**
write permissions (for organization-level runners).

</details>

<details>

#### GitLab

You can either
[create a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
with the `api` scope or a
[project access token](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html)
if your GitLab instance supports this feature; the latter will only work for
project-level
([specific](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#specific-runners))
runners, not for instance-level
([shared](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#shared-runners))
runners.

</details>

Ideally, you should not use personal access tokens from your own account, as
they grant access to all your repositories. Instead, it's higly recommended to
create a separate _bot account_ that only has access to the repositories where
you plan to deploy runners to. Bot accounts are
[the same](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#personal-user-accounts)
as normal user accounts, with the only difference being the intended use case.

### Cloud credentials

Note that you will also need to provide access credentials for your cloud
compute resources as secrets. In the above example, `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY` are required to deploy EC2 instances.

Click below to see credentials needed for supported cloud service providers.

<details>

#### AWS

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` **(optional)**

</details>

<details>

#### Azure

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_TENANT_ID`

</details>

## Using on-premise machines as self-hosted runners

You can also use `cml-runner` to set up a self-hosted runner on your local
machine or on-premise GPU cluster.

```dvc
cml-runner \
  --repo="$repository_url" \
  --token="$personal_access_token" \
  --labels="local,runner" \
  --idle-timeout=0
```

Now your machine will listen for jobs triggered on your repository and execute
them locally.

⚠️ **Warning:** people with access to your repository (everybody for public
ones) could execute arbirary code on your machine; please refer to the
corresponding
[GitHub](https://docs.github.com/es/actions/learn-github-actions/security-hardening-for-github-actions#hardening-for-self-hosted-runners)
and [GitLab](https://docs.gitlab.com/runner/security/) documentation for
additional guidance.
