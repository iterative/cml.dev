# Command Reference

## Generic Options

All CML commands support the following options:

- `--repo=<repo or org>`: Repository (or Organization) to be used [default:
  *inferred from environment*].
- `--token=<PAT>`:
  [Personal/project access token](https://cml.dev/doc/self-hosted-runners#personal-access-token)
  to be used [default: *inferred from environment*].
- `--log={error,warn,info,debug}`: Maximum log level [default: `info`].
- `--driver={github,gitlab,bitbucket}`: CI provider where the repository is
  hosted [default: *inferred from environment*].
- `--help`: Show help.
- `--version`: Show version number.
