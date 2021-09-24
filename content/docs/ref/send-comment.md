# Command Reference: `send-comment`

```dvc
cml send-comment some_content.md
```

## Common error messages

### Bitbucket

- Can't create a pull request comment: the Pull Request Commit Links application
  has not been installed.

We don't like ClickOps either but here's an actual
[quote from the Bitbucket docs](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/commit/%7Bcommit%7D/pullrequests):

> Pull Request Commit Links app must be installed first before using this API;
> installation automatically occurs when 'Go to pull request' is clicked from
> the web interface for a commit's details.
