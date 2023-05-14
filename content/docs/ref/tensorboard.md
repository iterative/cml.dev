# Command Reference: `tensorboard`

```usage
cml tensorboard connect [options]
```

Return a link to a <https://tensorboard.dev> page.

## Options

Any [generic option](/doc/ref) in addition to:

- `-c=<file>`, `--credentials=<file>`: TensorBoard JSON credentials (usually
  found at `~/.config/tensorboard/credentials/uploader-creds.json`) [default:
  *inferred from environment `CML_TENSORBOARD_CREDENTIALS`*].
- `--logdir=<path>`: Directory containing the logs to process.
- `--name=<...>`: TensorBoard experiment title (up to 100 characters).
- `--description=<...>`: TensorBoard experiment description (Markdown format, up
  to 600 characters).
- `--md`: Produce output in Markdown format (`[title](url)`).
- `-t=<...>`, `--title=<...>`: Title for Markdown output [default: *value of
  `--name`*].

## Examples

```cli
$ cml tensorboard connect --logdir=./logs --title=Training --md >> report.md
```

## Credentials

To generate new Tensorboard credentials, run `tensorboard dev upload` locally and set
the `CML_TENSORBOARD_CREDENTIALS` environment variable to the contents of
`~/.config/tensorboard/credentials/uploader-creds.json`
