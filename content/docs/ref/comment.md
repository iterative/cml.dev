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

### Updating specific comments
In some cases it may be necessary to more accurately target which comment is updated when
`cml comment update` is run, as by default the last cml-created comment will get updated.
This may be necessary when a workflow maintains two different continuously updated comments
or when a branch update might trigger multiple workflows.

By specifying the `--watermark-title='specific identifier'` cli flag for both commands, only
the specific comment with that watermark will be updated. Additionally, if it's necessary
to make the comment specific to a workflow or a workflow run, `--watermark-title` accepts
placeholder tags `{workflow}` and `{run}` which will be replaced with the workflow id
or workflow run id respectively.

Example of the `--watermark-title` flag:
- `--watermark-title='experiment-results'` - this comment will only be updated when the
  same watermark title is specified for the `cml comment update` command.
- `--watermark-title='{workflow}'` - this comment will be specific to the workflow that
  created it and only updated during other runs of that workflow.
- `--watermark-title='{run}'` - this comment will be specific to the workflow run that
  created it. Other executions of the same workflow will not update it.
- `--watermark-title='{workflow}-experiment-results'` - titles like this make it possible
  to maintain multiple workflow-specific comments.

<admon type="tip">

Both `cml comment create` and `cml comment update` need to specify the same value for the
`--watermark-title` flag to update the same comment.

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
- `--publish=<true|false>`: Upload any local images found in the Markdown report
  [default: `true`].
- `--publish-native`: Use `--driver`'s native capabilities to `--publish` assets
  instead of `--publish-url` (not available on `--driver=github`).
- `--publish-url=<url>`: Self-hosted image server URL [default:
  `https://asset.cml.dev`], see
  [minroud-s3](https://github.com/iterative/minroud-s3).
- `--watermark-title`: Specify a comment watermark title to more accurately target which comment will
  be updated with subsequent `cml comment update` calls.

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
