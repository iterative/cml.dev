# Command Reference: `runner`

```bash
cml runner [options]
```

Starts a [runner](/doc/self-hosted-runners) (either via any supported cloud
compute provider or locally on-premise).

## Options

Any [generic option](/doc/ref) in addition to:

- `--labels=<...>`: One or more (comma-delimited) labels for this runner
  [default: `cml`].
- `--name=<...>`: Runner name displayed in the CI [default: `cml-{ID}`].
- `--idle-timeout=<seconds>`: Seconds to wait for jobs before terminating. Set
  to `-1` to disable timeout [default: `300`].
- `--no-retry`: Don't restart the workflow when terminated due to instance
  disposal or
  [GitHub Actions timeout](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#usage-limits).
- `--single`: Terminate runner after one workflow run.
- `--reuse`: Don't launch a new runner if an existing one has the same name or
  overlapping labels. If an existing matching (same name or overlapping labels)
  instance is busy, it'll
  [still be reused](https://github.com/iterative/cml/issues/610).
- `--cloud={aws,azure,gcp,kubernetes}`: Cloud compute provider to host the
  runner.
- `--cloud-type={m,l,xl,m+k80,m+v100,...}`: Instance
  [type](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#machine-type).
  Also accepts native types such as `t2.micro`.
- `--cloud-gpu={nogpu,k80,v100,tesla}`: GPU type.
- `--cloud-hdd-size=<...>`: Disk storage in GB.
- `--cloud-spot`: Request a preemptible spot instance.
- `--cloud-spot-price=<...>`: Maximum spot instance USD bidding price, [default:
  *current price*].
- `--cloud-region={us-west,us-east,eu-west,eu-north,...}`:
  [Region](https://registry.terraform.io/providers/iterative/iterative/latest/docs/resources/task#cloud-regions)
  where the instance is deployed. Also accepts native AWS/Azure region or GCP
  zone [default: `us-west`].
- `--cloud-permission-set=<...>`:
  [AWS instance profile](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile)
  or
  [GCP instance service account](https://cloud.google.com/compute/docs/access/service-accounts).
- `--cloud-metadata=<...>`: `key=value` pair to associate with cloud runner
  instances. May be [specified multiple times](http://yargs.js.org/docs/#array).
- `--cloud-startup-script=<...>`: Run the provided
  [Base64](https://linux.die.net/man/1/base64)-encoded Linux shell script during
  the instance initialization.
- `--cloud-ssh-private=<key>`: Private SSH RSA key [default: *auto-generate
  throwaway key*]. Only supported on AWS and Azure; intended for debugging
  purposes.
- `--cloud-aws-security-group=<...>`:
  [AWS security group](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
  identifier.
- `--cloud-aws-subnet=<...>`:
  [AWS subnet](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#subnet-basics)
  identifier.
- `--docker-volumes=<...>`: Volume mount to pass to Docker, e.g.
  `/var/run/docker.sock:/var/run/docker.sock` for Docker-in-Docker support. May
  be specified multiple times. Only supported by GitLab.

## FAQs and Known Issues

- Bitbucket: Support for
  [self-hosted runners for Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/runners)
  is [coming soon](https://github.com/iterative/cml/pull/798).
- GitHub Actions by default timeout after a few hours. You can request up to
  [72 hours](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#usage-limits)
  via
  [`timeout-minutes: 4320`](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes).
  CML will helpfully restart GitHub Actions workflows approaching 72 hours
  (you'd need to write your code to save intermediate results to take advantage
  of this).

## Examples

### Using `--cloud-ssh-private`

1. Generate a new RSA PEM private key for debugging purposes:

   ```bash
   ssh-keygen -t rsa -m pem -b 4096 -f key.pem
   ```

2. Pass the contents of the generated private key file when invoking the
   `cml runner` command:

   ```bash
   cml runner --cloud=... --cloud-ssh-private="$(cat key.pem)"
   ```

3. Access the instance from your local system by using the generated key as an
   identity file:

   ```bash
   ssh -i key.pem ubuntu@IP_ADDRESS
   ```

   replacing the `IP_ADDRESS` placeholder with the instance address returned by
   `cml runner` (search the output logs for `instanceIp`).
