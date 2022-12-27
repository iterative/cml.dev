# Command Reference

CML provides a number of commands to help package the outputs of ML workflows
into a CML report, which may include numeric data or model performance
visualizations. Let's look at the typical sequence (after
[configuration](/doc/user-guide)):

∞ `cml runner` launches a runner hosted by a cloud compute provider or
[on-premise](/doc/self-hosted-runners).

∞ `cml pr` commits a set of files to a new branch and create a pull request.

∞ `cml comment` posts a Markdown report as a comment on a commit or pull/merge
request.

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
