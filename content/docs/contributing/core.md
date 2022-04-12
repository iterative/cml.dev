# Contributing to CML

We welcome contributions to [CML][cml-repo] by the community. See the
[Contributing to the Documentation](/doc/contributing/docs) guide if you want to
fix or update the documentation or this website.

[cml-repo]: https://github.com/iterative/cml

## Reporting a Problem

Spotted a bug? Let us know!

- For problems with [CML][cml-repo], search the
  [issue tracker](https://github.com/iterative/cml/issues) before creating a new
  issue (bug or feature request).
- If you'd like implement/fix things yourself, please see below for help on how
  to submit your changes.

[issue tracker]: https://github.com/iterative/cml/issues

> For problems with the [cml.dev](/) site, please see
> [Contributing to the Documentation](/doc/contributing/docs) instead.

## Submitting Contributions

1. [optional] Open a new issue in the [issue tracker].
2. [optional] Set up a [development environment](#development-environment) to
   run basic tests locally.
3. [Fork] the [CML][cml-repo] and make the necessary changes.
   - All JS code should follow the
     [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
4. [optional] [Add tests](#tests) for your changes to `src/*.test.js`.
5. Submit a [pull request], mentioning any related issues.

[fork]: https://docs.github.com/en/get-started/quickstart/fork-a-repo
[pull request]:
  https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request

We will review your pull request as soon as possible. Thank you for
contributing!

### Development Environment

Get the latest development version. [Fork] and clone the repo:

```bash
git clone git@github.com:<your-username>/cml.git
```

Ensure that you have Node.js 12.x or 14.x installed. Install coding style
pre-commit hooks with:

```bash
cd cml
npm install
```

That's it. You should be ready to make changes, run tests, and make commits! If
you experience any problems, please don't hesitate to ping us in our
[chat](https://cml.dev/chat).

### Maintainers

- **External pull requests**: Tests won't run until maintainers approve them
- **New pull requests**: Follow
  [Submitting Contributions](#submitting-contributions); except instead of
  forking, create a new branch at [CML][cml-repo]
- **Release managers**: In charge of merging pull requests after a one or more
  approving review(s) and tagging new releases
  - Ideally, squash-merge small PRs
  - Large PRs may be merged without squashing (but related commits should be
    squashed)
- **New releases**
  - `git checkout master && git pull && git checkout -b M.m.p && npm version vM.m.p && git push --set-upstream origin HEAD && gh pr create`
  - Merge the resulting PR
  - `git checkout master && git pull && git tag -f vM.m.p && git push --tags` or
    comment `/tag vM.m.p SHA` in the PR
  - Wait for a draft to appear under
    [releases](https://github.com/iterative/cml/releases)
  - Check & publish the draft
