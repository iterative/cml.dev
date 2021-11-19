# Command Reference: `send-comment`

Post a markdown comment on a commit.

```bash
cml send-comment ./report.md
```

ⓘ If there's an associated pull/merge request, consider adding the `--pr` and
`--update` flags.

ⓘ If `cml pr` was used earlier in the workflow, use `--commit-sha=HEAD` to post
comments to the new PR if desired.

## Common error messages

### Bitbucket

- **Can't create a pull request or commit comment** / **Invalid or unknown
  installation**.

  This happens because the Pull Request Commit Links application has not been
  installed into your BitBucket workspace. You can install it by following these
  instructions from the [Bitbucket docs][bb-docs-install-pr-links]:

  > Pull Request Commit Links app must be installed first before using this API;
  > installation automatically occurs when 'Go to pull request' is clicked from
  > the web interface for a commit's details.

  We don't like ClickOps either, but it's the way it is.

[bb-docs-install-pr-links]:
  https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/commit/%7Bcommit%7D/pullrequests
