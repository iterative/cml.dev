# Command Reference: `check`

```usage
cml check create [options] <markdown report file>
```

Posts a Markdown report using GitHub's
[Checks API](https://docs.github.com/en/rest/reference/checks).

> Similar to [`cml comment create`](/doc/ref/comment#create).

## Options

Any [generic option](/doc/ref) in addition to:

- `--commit-sha=<ref>`, `--head-sha=<ref>`: [Git revision] linked to this check
  [default: `HEAD`]
- `--title=<...>`: The check's title [default: `CML Report`]
- `--status={queued,in_progress,completed}`: The check's current status
  [default: `completed`]
- `--conclusion={success,failure,neutral,cancelled,skipped,timed_out}`: The
  check's final status [default: `success`]

[git revision]: https://git-scm.com/docs/gitrevisions

## FAQs and Known Issues

### GitHub

- **CML Report Expected -- Waiting for status to be reported**.

  Authentication must be done through an automatically-generated
  [`GITHUB_TOKEN`] or a [GitHub App token]. [Personal access tokens (PATs)]
  can't be used to create checks.

[`github_token`]:
  https://docs.github.com/en/actions/security-guides/automatic-token-authentication
[github app token]: /doc/self-hosted-runners?tab=GitHub#app
[personal access tokens (pats)]: /doc/self-hosted-runners?tab=GitHub#pat
