# Command Reference: `send-comment`

```bash
cml send-comment [options] <markdown report file>
```

Post a markdown report as a comment on a commit or pull/merge request.

ⓘ If there's an associated pull/merge request, consider adding the `--pr` and
`--update` flags.

ⓘ If `cml pr` was used earlier in the workflow, use `--commit-sha=HEAD` to post
comments to the new PR if desired.

## Options

Any [generic option](/doc/ref) in addition to:

- `--commit-sha=<rev>`, `--head-sha=<rev>`:
  [Git revision](https://git-scm.com/docs/gitrevisions) linked to this comment
  [default: `HEAD`].
- `--pr`: Post to an existing PR/MR associated with the specified commit.
- `--update`: Update the last CML comment (if any) instead of creating a new
  one.
- `--rm-watermark`: Don't inject a watermark into the comment. Will break some
  CML functionality (such as `--update`) which needs to distinguish CML reports
  from other comments.

## FAQs and Known Issues

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
