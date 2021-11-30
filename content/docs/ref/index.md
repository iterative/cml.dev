# Command Reference

## Generic Options

All CML commands support the following options:

- `--driver=<ci>`: CI provider where the repository is hosted, choices: {github,
  gitlab, bitbucket} [default: *inferred from environment*].
- `--repo=<repo or org>`: Repository (or Organization) to be used [default:
  *inferred from environment*].
- `--token=<PAT>`:
  [Personal/project access token](https://cml.dev/doc/self-hosted-runners#personal-access-token)
  to be used [default: *inferred from environment*].
- `--help`: Show help.
- `--log=<level>`: Maximum log level, choices: {error, warn, info, debug}
  [default: info].
- `--version`: Show version number.
