# Command Reference: `pr`

Commit specified files to a new branch and create a pull request.

```dvc
cml pr '**/*.py' '**/*.json'
```

is roughly equivalent to:

```dvc
SHA="$(git log -n1 --format=%h)"
BASE="$(git branch)"
git checkout -b "${BASE}-cml-pr-${SHA}"
git add *.py *.json
git commit -m "CML PR for ${SHA} [skip ci]"
git push
gh pr create -B ${BASE}
```
