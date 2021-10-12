# Command Reference: `runner`

Starts a [runner](/doc/self-hosted-runners) (either via any supported cloud
compute provider or locally on-premise).

See [Options](/doc/self-hosted-runners#options).

> > :bulb: _See also
> > [iterative/dvc.org#2312](https://github.com/iterative/dvc.org/pull/2312),
> > [iterative/dvc.org#2321](https://github.com/iterative/dvc.org/pull/2321) and
> > the result of all that review work,
> > [dvc.org/doc/cml/self-hosted-runners#options](https://dvc.org/doc/cml/self-hosted-runners#options)._

## Options

- `--reuse` — don't create a new runner if the repository already has one
  registered with the same `--name` or including all the specified `--labels`,
  [even if it's busy](https://github.com/iterative/cml/issues/610).
- `--cloud-ssh-private=<key>` — private key (RSA PEM) to provision the runner
  instance; only supported on AWS and Azure, intended for debugging purposes.

## Examples

#### Using `--cloud-ssh-private`

1. Generate a new RSA PEM private key for debugging purposes:

   ```console
   $ ssh-keygen -t rsa -m pem -b 4096 -f key.pem
   ```

1. Pass the contents of the generated private key file when invoking the
   `cml-runner` command:

   ```console
   $ cml-runner --cloud ··· --cloud-ssh-private="$(cat key.pem)"
   ```

1. Access the instance from your local system by using the generated key as an
   indentity file:

   ```console
   $ ssh -i key.pem ubuntu@IP_ADDRESS
   ```

_Note: the `IP_ADDRESS` placeholder should be replaced by the instance address
returned by `cml-runner` after a succesful execution; search for `instanceIp` on
the logs to find it._

## Known issues

### Bitbucket

⚠️ Using
[self-hosted runners for Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/runners)
is not yet supported.
