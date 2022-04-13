# Command Reference: `ci`

```bash
cml ci [options]
```

Prepares Git repository for CML operations (setting Git `user.name` &
`user.email`; fetching all branch tips; undoing CI oddities such as origin URL
formatting and HTTP remote proxies; and, optionally, unshallowing clone).

## Options

Any [generic option](/doc/ref) in addition to:

- `--unshallow`: Fetch as much as possible, converting a shallow repository to a
  complete one.
- `--user-email=<address>`: Git user email for commits [default:
  `olivaw@iterative.ai`].
- `--user-name=<...>`: Git user name for commits [default: `Olivaw[bot]`].

## Examples

Instead of wrangling with
[unshallowing clones](https://stackoverflow.com/q/6802145) and
`git config user.email` before being able to `git commit` or use
[`cml pr`](/doc/ref/pr), simply run:

```bash
cml ci
```
