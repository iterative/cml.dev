# Command Reference: `tensorboard-dev`

```bash
cml tensorboard-dev [options]
```

Return a link to a <https://tensorboard.dev> page.

## Options

Any [generic option](/doc/ref) in addition to:

- `-c=<file>`, `--credentials=<file>`: TensorBoard JSON credentials (usually
  found at `~/.config/tensorboard/credentials/uploader-creds.json`) [default:
  *inferred from environment `TB_CREDENTIALS`*].
- `--logdir=<path>`: Directory containing the logs to process.
- `--name=<...>`: TensorBoard experiment title (up to 100 characters).
- `--description=<...>`: TensorBoard experiment description (markdown format, up
  to 600 characters).
- `--md`: Produce output in markdown format (`[title](url)`).
- `-t=<...>`, `--title=<...>`: Title for markdown output [default: *value of
  `--name`*].
- `--rm-watermark`: Don't inject a watermark into the comment. Will break some
  CML functionality which needs to distinguish CML reports from other comments.

## Examples

```bash
cml tensorboard-dev --logdir=./logs --title=Training --md >> report.md
```
