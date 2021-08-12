# Contributing to CML

We welcome contributions to [CML][cml-repo] by the community. See the
[Contributing to the Documentation](/doc/contributing/docs) guide if you want to
fix or update the documentation or this website.

[cml-repo]: https://github.com/iterative/cml

## Reporting a Problem

Spotted a bug? Let us know!

- For problems with [CML][cml-repo], search the
  [issue tracker](https://github.com/iterative/cml/issues) before creating a new
  issue (problem or an improvement request).
- If you'd like implement/fix things yourself, please see below for help on how
  to submit your changes.

> For problems with the [cml.dev](/) site, please see
> [Contributing to the Documentation](/doc/contributing/docs) instead.

## Contributions

Pull request tests won't run until maintainers approve them.

## Coding conventions

All the CML JavaScript code should follow the
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

## Maintenance

### New pull requests

1. Use a branch and create a pull request targeting the `master` branch
2. Release managers will be in charge of merging pull requests after a one or
   more approving review.

## New releases

1. `git checkout master && git pull && npm version vM.m.p && git push && git push --tags`
2. Draft a new [release](https://github.com/iterative/cml/releases)
   - make sure all commits since last release are summarised in the release
     notes
