# Command Reference

## Generic Options

All CML commands support the following options:

```
--help                      Show help                                [boolean]
--version                   Show version number                      [boolean]
--log                       Maximum log level
        [string] [choices: "error", "warn", "info", "debug"] [default: "info"]
--driver                    Platform where the repository is hosted. If not
                            specified, it will be inferred from the
                            environment [string] [choices: "github", "gitlab"]
--repo                      Repository (or Organization) to be used.
                            If not specified, it will be inferred from the
                            environment                               [string]
--token                     Personal access token to be used. If not specified,
                            it will be inferred from the environment  [string]
```
