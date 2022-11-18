# Command Reference: `publish`

```usage
cml publish [options] <image file>
```

Publicly host an image for displaying in a CML report. Used internally by
[`cml comment {create,update} --publish`](/doc/ref/comment).

## Options

Any [generic option](/doc/ref) in addition to:

- `--md`: Produce output in Markdown format.
- `-t=<...>`, `--title=<...>`: Title for Markdown output
- `--mime-type=<...>`: Content [MIME type] [default: *inferred from content*]
- `--native`: Uses CI provider's native storage instead of CML's. [Not available
  on GitHub].
- `--url=<...>`: Use a custom storage URL instead of asset.cml.dev. See
  [`minroud-s3`] for a reference implementation.

[mime type]: https://www.iana.org/assignments/media-types/media-types.xhtml
[not available on github]:
  https://github.com/iterative/cml/wiki/Backend-Supported-Features
[`minroud-s3`]: https://github.com/iterative/minroud-s3

## Examples

To render an image in a Markdown file:

```cli
$ cml publish ./plot.png --md >> report.md
```
