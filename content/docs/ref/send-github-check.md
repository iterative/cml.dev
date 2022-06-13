# Command Reference: `send-github-check`

```bash
cml send-github-check [options] <markdown report file>
```

Similar to [`send-comment`](/doc/ref/send-comment), but using GitHub's
[checks interface](https://docs.github.com/en/rest/reference/checks).

ⓘ Authentication must be done through an automatically generated
[`GITHUB_TOKEN`](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)
or a
[GitHub App token](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps).
Personal access tokens can't be used to create checks.

## Options

Any [generic option](/doc/ref) in addition to:

- `--commit-sha=<ref>`, `--head-sha=<ref>`:
  [Git revision](https://git-scm.com/docs/gitrevisions) linked to this check
  [default: `HEAD`].
- `--title=<...>`: The check's title [default: `CML Report`].
- `--conclusion={success,failure,neutral,cancelled,skipped,timed_out}`: The
  check's status [default: `success`].
