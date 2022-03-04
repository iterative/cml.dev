# Command Reference: `ci`

```bash
cml ci [options]
```

Prepares Git repository for CML operations (setting Git `user.name` &
`user.email`, unshallow clone and undo CI oddities such as origin URL formatting
and HTTP remote proxies).

## Options

Any [generic option](/doc/ref).

## Examples

Instead of wrangling with
[unshallowing clones](https://stackoverflow.com/q/6802145) and
`git config user.email` before being able to `git commit` or use
[`cml pr`](/doc/ref/pr), simply run:

```bash
cml ci
```
