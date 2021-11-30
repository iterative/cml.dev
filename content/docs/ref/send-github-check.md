# Command Reference: `send-github-check`

```bash
cml send-github-check [options] <markdown report file>
```

Similar to [`send-comment`](/doc/ref/send-comment), but using GitHub's
[checks interface](https://docs.github.com/en/rest/reference/checks).

## Options

```
--commit-sha, --head-sha  Commit SHA linked to this comment. Defaults to HEAD.
                                                                      [string]
--conclusion              Sets the conclusion status of the check.
   [string] [choices: "success", "failure", "neutral", "cancelled", "skipped",
                                             "timed_out"] [default: "success"]
--title                   Sets title of the check.
                                              [string] [default: "CML Report"]
```
