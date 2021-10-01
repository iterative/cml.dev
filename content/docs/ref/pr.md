# Command Reference: `pr`

Commit specified files to a new branch and create a pull request.

```bash
cml pr "**/*.py" "**/*.json"
```

is roughly equivalent to:

```bash
SHA="$(git log -n1 --format=%h)"
BASE="$(git branch)"
git checkout -b "${BASE}-cml-pr-${SHA}"
find . -name "*.py" -o -name "*.json" | xargs git add
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
      \"Automated commits for ${GITHUB_REPOSITORY}/commit/${SHA} created by CML.\"
  }" \
  | jq -r .url
```
