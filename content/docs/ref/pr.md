# Command Reference: `pr`

Commit specified files to a new branch and create a pull request. If sending a
report afterwards, consider using `cml send-comment --pr --update`.

ⓘ Pull requests created with `cml pr` **won't** trigger a new CI/CD run,
thereby preventing an infinite chain of runs.

ⓘ You can specify the files to track using any syntax supported by [Git pathspec](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec).

## Options

```
--help                      Show help                                [boolean]
--version                   Show version number                      [boolean]
--log                       Maximum log level
        [string] [choices: "error", "warn", "info", "debug"] [default: "info"]
--md          Output in markdown format [](url).                    [boolean]
--remote      Sets git remote.                   [string] [default: "origin"]
--user-email  Sets git user email.
                                    [string] [default: "olivaw@iterative.ai"]
--user-name   Sets git user name.
                                            [string] [default: "Olivaw[bot]"]
--repo        Specifies the repo to be used. If not specified is extracted
              from the CI ENV.                                       [string]
--token       Personal access token to be used. If not specified in extracted
              from ENV REPO_TOKEN.                                   [string]
--driver      If not specify it infers it from the ENV.
                                       [string] [choices: "github", "gitlab"]
```

## Examples

### Commit all files in current working directory

```bash
cml pr "."
```

### Automatically merge GitHub pull requests

```yaml
on: pull_request
jobs:
  cml:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: iterative/setup-cml@v1
      - name: Generate data
        run: echo "Hello World" > output.txt
      - name: Create and merge PR
        run: gh pr merge --rebase $(cml pr "output.txt")
        env:
          REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Command internals

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
