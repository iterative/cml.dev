# Command Reference: `send-github-check`

```bash
cml send-github-check [options] <markdown report file>
```

Similar to [`send-comment`](/doc/ref/send-comment), but using GitHub's
[checks interface](https://docs.github.com/en/rest/reference/checks).

## Options

Any [generic option](/doc/ref) in addition to:

- `--commit-sha=<ref>`, `--head-sha=<ref>`:
  [Git revision](https://git-scm.com/docs/gitrevisions) linked to this check
  [default: `HEAD`].
- `--title=<...>`: The check's title [default: `CML Report`].
- `--conclusion={success,failure,neutral,cancelled,skipped,timed_out}`: The
  check's status [default: `success`].
