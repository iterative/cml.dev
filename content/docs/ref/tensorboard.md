# Command Reference: `tensorboard`

```usage
cml tensorboard connect [options]
```

Returns the link to a <https://tensorboard.dev> page.

## Options

Any [generic option](/doc/ref) in addition to:

- `-c=<file>`, `--credentials=<file>`: TensorBoard JSON credentials (usually
  found at `~/.config/tensorboard/credentials/uploader-creds.json`) [default:
  *inferred from environment `TB_CREDENTIALS`*].
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
