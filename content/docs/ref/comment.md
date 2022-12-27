# Command Reference: `comment`

CML reports are written in Markdown ([GitHub](https://github.github.com/gfm),
[GitLab](https://docs.gitlab.com/ee/user/markdown.html), or
[Bitbucket](https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html)
flavors). That means they can contain images, tables, formatted text, HTML
blocks, code snippets and more — really, what you put in a CML report is up to
you. See some [examples](#examples).

## create

```usage
cml comment create [options] <markdown report file>
```

Post a Markdown report as a comment on a commit, pull/merge or issue request. By
default, PR comments are created (see `--target` for more details).

## update

```usage
cml comment update [options] <markdown report file>
```

Update the last CML comment instead of creating a new one. If no previous
comment is found, create a new one.

<admon type="tip">

When using multiple reports, use
[`--watermark-title=<...>`](#managing-multiple-comments) to specify which
comment to `update`.

</admon>

## Options

Any [generic option](/doc/ref) in addition to:

- `--target`: Specify comment type and target (`pr`, `commit`, `issue/12`,
  `pr/17` or `commit/abcdef`). Defaults to 1) using the PR associated with the
  workflow context, 2) finding a PR containing the `HEAD` commit, or 3)
  attaching the comment to the `HEAD` commit itself.

- `--watch`: Watch for changes and automatically update the comment (doesn't
  exit, consider
  [appending `&` to run in the background](<https://en.wikipedia.org/wiki/Job_control_(Unix)#Implementation>)).

- `--publish=<true|false>`: Upload any local images found in the Markdown report
  [default: `true`].

- `--publish-native`: Use `--driver`'s native capabilities to `--publish` assets
  instead of `--publish-url` (not available on `--driver=github`).

- `--publish-url=<...>`: Self-hosted image server URL [default:
  `https://asset.cml.dev`], see
  [minroud-s3](https://github.com/iterative/minroud-s3).

- `--watermark-title=<...>`: Hidden comment marker (useful to
  [specify which comment to update](#managing-multiple-comments) in subsequent
  `cml comment update` calls); `"{workflow}"` and `"{run}"` are auto-replaced.

## Examples

### Commenting on commits or issues

Use the `--target` option for fine-grained control on where to post the comment.

```cli
# Create an issue comment
$ cml comment create --target=issue/12 report.md

# Create a pull/merge request comment for a specific PR
$ cml comment create --target=pr/12 report.md

# Create a commit comment attached to a specific commit
$ cml comment create --target=commit/abcdef report.md
```

### Managing multiple comments

Repeatedly running `cml comment create` may produce too many comments. Meanwhile
`cml comment update` will only produce/update one comment. What if you'd like to
have exactly two comments (corresponding to two different Markdown reports,
possibly from different parallel workflows) visible at a time?

To mark and subsequently update a particular comment, use
`--watermark-title="some text"`. To mark a comment according to the workflow or
run ID, include the placeholder text `"{workflow}"` and `"{run}"`. For example:

```cli
# Create and constantly update 2 separate comments
$ cml comment update --watch \
                     --watermark-title='first {workflow} report' \
                     report.md &
$ cml comment update --watch \
                     --watermark-title='second {workflow} report' \
                     debug.md &
$ python train.py --report-file=report.md --debug-file=debug.md

# Same, but create a new pair of comments if rerunning a workflow
$ cml comment update --watch \
                     --watermark-title='first {run} report' \
                     report.md &
$ cml comment update --watch \
                     --watermark-title='second {run} report' \
                     debug.md &
$ python train.py --report-file=report.md --debug-file=debug.md
```

## FAQs and Known Issues

### GitHub

- **`commit_id` has been locked**.

  This [error] is caused by using the default GitHub token with
  [`cml comment update`](#update). Use a [personal access token (PAT)] instead.

[error]:
  https://github.community/t/comment-api-does-not-describe-commit-id-has-been-locked/159853/2
[personal access token (pat)]:
  /doc/self-hosted-runners?tab=GitHub#personal-access-token

### Bitbucket

- **Can't create a pull request or commit comment** / **Invalid or unknown
  installation**.

  This happens because the Pull Request Commit Links application has not been
  installed into your BitBucket workspace. You can install it by following these
  instructions from the [Bitbucket docs]:

  > Pull Request Commit Links app must be installed first before using this API;
  > installation automatically occurs when 'Go to pull request' is clicked from
  > the web interface for a commit's details.

  We don't like ClickOps either, but it's the way it is.

[bitbucket docs]:
  https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests#api-repositories-workspace-repo-slug-commit-commit-pullrequests-get
