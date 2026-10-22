# Command Reference: `asset publish`

```usage
cml asset publish [options] <asset file>
```

Upload a file, such as an image, and print a URL for embedding it in a CML
report. [`cml comment create`](/doc/ref/comment) does this automatically for
local files linked from the report.

<admon type="warn">

The default server, `asset.cml.dev`, no longer accepts uploads. Use `--native`
on GitLab and Bitbucket, or `--url` with your own server. See
[Image Hosting](/doc/image-hosting).

</admon>

## Options

Any [generic option](/doc/ref) in addition to:

- `--md`: Produce output in Markdown format.
- `-t=<...>`, `--title=<...>`: Title for Markdown output.
- `--mime-type=<...>`: Content
  [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml)
  [default: *inferred from content*].
- `--native`: Upload to the CI provider's own storage (GitLab and Bitbucket
  only).
- `--url=<...>`:
  [Self-hosted image server](/doc/image-hosting#your-own-image-server) URL, also
  read from the `CML_ASSET_URL` environment variable.

## Examples

To render an image in a Markdown file, using your own image server:

```cli
$ export CML_ASSET_URL="https://images.example.com/?token=..."
$ cml asset publish ./plot.png --md >> report.md
```

On GitLab or Bitbucket, using the provider's storage:

```cli
$ cml asset publish --native ./plot.png --md >> report.md
```
