# Command Reference: `send-github-check`

```usage
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
- `--status={queued,in_progress,completed}`: The check's current status
  [default: `completed`].
- `--conclusion={success,failure,neutral,cancelled,skipped,timed_out}`: The
  check's final status [default: `success`].

## FAQs and Known Issues

### GitHub

- **CML Report Expected -- Waiting for status to be reported**.

  Authentication must be done through an automatically-generated
  [`GITHUB_TOKEN`](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)
  or a
  [GitHub App token](https://cml.dev/doc/self-hosted-runners?tab=GitHub#app).
  [Personal access tokens (PATs)](https://cml.dev/doc/self-hosted-runners?tab=GitHub#pat)
  can't be used to create checks.
