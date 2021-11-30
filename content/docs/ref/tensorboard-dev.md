# Command Reference: `tensorboard-dev`

```bash
cml tensorboard-dev [options]
```

Return a link to a <https://tensorboard.dev> page.

## Options

Any [generic option](/doc/ref) in addition to:

```
-c, --credentials   TB credentials as json. Usually found at
                    ~/.config/tensorboard/credentials/uploader-creds.json. If
                    not specified will look for the json at the env variable
                    TB_CREDENTIALS.                        [string] [required]
    --logdir        Directory containing the logs to process.         [string]
    --name          Tensorboard experiment title. Max 100 characters. [string]
    --description   Tensorboard experiment description. Markdown format. Max
                    600 characters.                                   [string]
    --md            Output as markdown [title || name](url).         [boolean]
-t, --title         Markdown title, if not specified, param name will be used.
                                                                      [string]
-f, --file          Append the output to the given file. Create it if does not
                    exist.                                            [string]
    --rm-watermark  Avoid CML watermark.                             [boolean]
```

## Examples

```bash
cml tensorboard-dev --logdir=./logs --title=Training --md >> report.md
```
