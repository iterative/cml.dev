# Command Reference: `pr`

```bash
cml pr [options] <pathspec>...
```

Commit specified files to a new branch and create a pull request. If sending a
report afterwards, consider using `cml send-comment --pr --update`.

ⓘ Pull requests created with `cml pr` **won't** trigger a new CI/CD run, thereby
preventing an infinite chain of runs.

ⓘ Files to commit can be specified using any syntax supported by
[Git pathspec](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec).

## Options

Any [generic option](/doc/ref) in addition to:

- `--merge`, `--rebase`, or `--squash`: Try to merge, rebase, or squash-merge
  the created PR after CI tests pass.
- `--md`: Produce output in markdown format (`[CML Pull/Merge Request](url)`
  instead of `url`).
- `--remote=<name or URL>`: Git remote name or URL [default: `origin`].
- `--user-email=<address>`: Git user email for commits [default:
  `olivaw@iterative.ai`].
- `--user-name=<...>`: Git user name for commits [default: `Olivaw[bot]`].

## Examples

### Commit all files in current working directory

```bash
cml pr .
```

### Automatically merge pull requests

```bash
date > output.txt
cml pr --auto-merge output.txt
```

The `--merge`, `--rebase`, and `--squash` options enable
[auto–merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
(GitHub) or
[merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)
(GitLab) to merge the pull request as soon as checks succeed. If waiting for
checks isn't supported, `cml pr` will try to merge the pull request immediately.

## Command internals

```bash
cml pr "**/*.py" "**/*.json"
```

is roughly equivalent to:

```bash
SHA="$(git log -n1 --format=%h)"
BASE="$(git branch)"

git checkout "${BASE}-cml-pr-${SHA}"

if [[ $(git ls-remote --exit-code origin\
        "${BASE}-cml-pr-${SHA}" &>/dev/null) ]]; then
  # branch already exists; just print its PR URL
  curl \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls \
    | jq -r ".[] | select(.head.ref == '${BASE}-cml-pr-${SHA}') | .url"
else
  # create branch & PR
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
