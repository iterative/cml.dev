# Command Reference

## Generic Options

All `cml` commands support the following options:

- `--repo=<repo or org>`: Repository (or Organization) URL or slug [default:
  *inferred from environment*]
- `--token=<PAT>`: [Personal/project access token] to be used [default:
  *inferred from environment*]
- `--log={error,warn,info,debug}`: Logging verbosity [default: `info`]
- `--driver={github,gitlab,bitbucket}`: CI provider where workflows are run
  [default: *inferred from environment*]
- `--help`: Show help.
- `--version`: Show version number.

[personal/project access token]:
  https://cml.dev/doc/self-hosted-runners#personal-access-token
