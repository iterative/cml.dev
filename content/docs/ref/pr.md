# Command Reference: `pr`

```usage
cml pr create [options] <pathspec>...
```

Commits a set of files (any [Git pathspec]) to a new branch and creates a pull
request. If sending a report afterward, consider using
[`cml comment update --pr`](/doc/ref/comment#update).

[git pathspec]:
  https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec

<details>

### Click to see what happens under the hood.

```cli
$ cml pr create "**/*.py" "**/*.json"
```

is roughly equivalent to

```bash
SHA="$(git log -n1 --format=%h)"
BASE="$(git branch)"

git checkout "${BASE}-cml-pr-${SHA}"

if [[ $(git ls-remote --exit-code origin\
        "${BASE}-cml-pr-${SHA}" &>/dev/null) ]]; then
  # Branch already exists; Just print its PR URL.
  curl \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls \
    | jq -r ".[] | select(.head.ref == '${BASE}-cml-pr-${SHA}') | .url"
else
  # Create branch & PR.
  git checkout -b "${BASE}-cml-pr-${SHA}"
  git add "**/*.py" "**/*.json"
  git commit -m "CML PR for ${SHA} [skip ci]"
  git push
  curl \
    -X POST \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls \
    -d "{
      \"head\": \"${BASE}-cml-pr-${SHA}\",
      \"base\": \"${BASE}\",
      \"title\": \"CML PR for ${BASE} ${SHA}\",
      \"description\":
        \"Automated commits for\
          ${GITHUB_REPOSITORY}/commit/${SHA} created by CML.\"
    }" \
    | jq -r .url
fi
```

</details>

<admon type="info">

Pull requests created with `cml pr` **won't** trigger a new CI/CD run, thereby
preventing an infinite chain of runs. In some cases, the `--skip-ci` flag may be
required (e.g. to stop GitLab CI running after `--merge`).

</admon>

## Options

Any [generic option](/doc/ref) in addition to:

- `--merge`, `--squash`, or `--rebase`: Try to merge, squash-merge, or rebase
  the PR (after CI tests pass).

  <admon type="info">

  These options enable [auto–merge] (GitHub) or [merge when pipeline succeeds]
  (GitLab) to merge the pull request as soon as checks succeed.

  </admon>

- `--md`: Produce output in Markdown format (`[CML Pull/Merge Request](url)`
  instead of `url`).

- `--skip-ci`: Prevent the PR/MR from triggering another CI run post-merge.

- `--remote=<name or URL>`: Git remote name or URL [default: `origin`]

- `--user-email=<address>`: Git user email for commits [default:
  `olivaw@iterative.ai`]

- `--user-name=<...>`: Git user name for commits [default: `Olivaw[bot]`]

- `--branch`: Pull request branch name [default: auto-generated]

- `--title`: Pull request title [default: auto-generated]

- `--body`: Pull request description [default: auto-generated]

- `--message`: Commit message [default: auto-generated]

[auto–merge]:
  https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request
[merge when pipeline succeeds]:
  https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html

## Examples

Commit all files in current working directory:

```cli
$ cml pr create .
```

Automatically merge pull requests:

```cli
$ date > output.txt
$ cml pr create --merge output.txt  # or --squash/--rebase
```
