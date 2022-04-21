# Command Reference: `publish`

```bash
cml publish [options] <image file>
```

Publicly host an image for displaying in a CML report.

## Options

Any [generic option](/doc/ref) in addition to:

- `--md`: Produce output in markdown format.
- `-t=<...>`, `--title=<...>`: Title for markdown output.
- `--mime-type=<...>`: Content
  [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml)
  [default: *inferred from content*].
- `--native`: Uses CI provider's native storage instead of CML's.
  [Not available on GitHub](https://github.com/iterative/cml/wiki/Backend-Supported-Features).
- `--rm-watermark`: Don't inject a watermark into the comment. Will break some
  CML functionality which needs to distinguish CML reports from other comments.

## Examples

To render an image in a markdown file:

```bash
cml publish ./plot.png --md >> report.md
```
