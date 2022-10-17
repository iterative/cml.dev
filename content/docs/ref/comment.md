# Command Reference: `comment`

## create

Post a Markdown report as a comment on a commit or pull/merge request.

```usage
cml comment create [options] <markdown report file>
```

## update

Update the last CML comment instead of creating a new one. If no previous
comment is found, create a new one.

```usage
cml comment update [options] <markdown report file>
```

<admon type="tip">

If there's an associated pull/merge request, consider using `update` with the
`--pr` flag.

</admon>

<admon type="tip">

If [`cml pr`](/doc/ref/pr) was used earlier in the workflow, use
`--commit-sha=HEAD` to post comments to the new PR if desired.

</admon>

## Options

Any [generic option](/doc/ref) in addition to:

- `--commit-sha=<rev>`, `--head-sha=<rev>`:
  [Git revision](https://git-scm.com/docs/gitrevisions) linked to this comment
  [default: `HEAD`].
- `--pr`: Post to an existing PR/MR associated with the specified commit.
- `--watch`: Watch for changes and automatically update the comment (doesn't
  exit, consider
  [appending `&` to run in the background](<https://en.wikipedia.org/wiki/Job_control_(Unix)#Implementation>)).
- `--publish=false`: Don't upload any local images found in the Markdown report.
- `--publish-native`: Uses `--driver`'s native capabilities to `--publish`
  assets instead of `--publish-url` (not available on `--driver=github`).
- `--publish-url=<url>`: Self-hosted image server URL [default:
  `https://asset.cml.dev`], see
  [minroud-s3](https://github.com/iterative/minroud-s3).

## FAQs and Known Issues

### GitHub

- **`commit_id` has been locked**.

  This
  [error](https://github.community/t/comment-api-does-not-describe-commit-id-has-been-locked/159853/2)
  is caused by using the default GitHub token with
  [`cml comment update`](#update). Use a
  [personal access token (PAT)](/doc/self-hosted-runners?tab=GitHub#personal-access-token)
  instead.

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
  https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests#api-repositories-workspace-repo-slug-commit-commit-pullrequests-get
